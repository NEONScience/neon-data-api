package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"regexp"
	"runtime"
	"strings"
)

type sanitizedFileSystem struct {
	fs http.FileSystem
}
type healthCheckResponse struct {
	Status string `json:"status"`
}

var (
	fileDir       string = "/go/src/app/site/"
	indexFilename string = "index.html"
	clientRoute   string = os.Getenv("PORTAL_CLIENT_ROUTE")
	port          string = os.Getenv("PORTAL_PORT")
	routeRegex           = regexp.MustCompile(fmt.Sprintf(`^%s(.*)`, clientRoute))
	healthPath    string = "/health"
)

var (
	infoLog  = log.New(os.Stdout, "", log.LstdFlags)
	errorLog = log.New(os.Stderr, "", log.LstdFlags)
)

var healthResponse healthCheckResponse = healthCheckResponse{
	Status: "UP",
}

func handleHealthCheck(w http.ResponseWriter) {
	infoLog.Println("INFO: Health check up")
	w.Header().Add("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(healthResponse); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Header().Set("Content-Type", "text/plain")
		w.Write([]byte("Failed health check"))
	}
}

func (fs sanitizedFileSystem) containsDotFile(name string) bool {
	parts := strings.Split(name, "/")
	for _, part := range parts {
		if strings.HasPrefix(part, ".") {
			return true
		}
	}
	return false
}

// Open the http.FileSystem implementation to ensure we do not respond to
// directory or dot file requests.
func (fs sanitizedFileSystem) Open(name string) (http.File, error) {
	if fs.containsDotFile(name) {
		return nil, os.ErrNotExist
	}
	f, err := fs.fs.Open(name)
	if err != nil {
		return nil, err
	}
	s, _ := f.Stat()
	if s.IsDir() {
		index := fmt.Sprintf("%s/%s", strings.TrimSuffix(name, "/"), indexFilename)
		ff, err := fs.fs.Open(index)
		if err != nil {
			return nil, err
		}
		defer ff.Close()
	}
	return f, nil
}

func getRootHandlerFunc() http.HandlerFunc {
	fs := http.FileServer(sanitizedFileSystem{http.Dir(fileDir)})
	handleFileServer := http.StripPrefix(clientRoute, fs)
	return func(w http.ResponseWriter, r *http.Request) {
		switch {
		case healthPath == r.URL.Path:
			handleHealthCheck(w)
		case routeRegex.MatchString(r.URL.Path):
			handleFileServer.ServeHTTP(w, r)
		default:
			http.NotFound(w, r)
		}
	}
}

func main() {
	infoLog.Println("INFO: Starting go static file server...")
	runtime.GOMAXPROCS(runtime.NumCPU())
	http.HandleFunc("/", getRootHandlerFunc())
	infoLog.Printf("INFO: Listening on port %s", port)
	infoLog.Printf("INFO: Serving files from directory %s", fileDir)
	if err := http.ListenAndServe(fmt.Sprintf(":%s", port), nil); err != nil {
		errorLog.Fatalf("Error in ListenAndServe: %s", err)
	}
}
