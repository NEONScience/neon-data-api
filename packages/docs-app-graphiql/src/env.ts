export interface ApiHostEnv {
  getApiProtocol: () => string;
  getApiHostName: () => string;
  getApiHost: () => string;
}

const Env: ApiHostEnv = {
  getApiProtocol: (): string => {
    let protocol = `${window.location.protocol}`;
    const protocolOverride: string | undefined = process.env.REACT_APP_NEON_API_HOST_PROTOCOL;
    if (typeof protocolOverride === 'string' && (protocolOverride.length > 0)) {
      protocol = String(protocolOverride);
    }
    return `${protocol}`;
  },
  getApiHostName: (): string => {
    let hostName = `${window.location.host}`;
    const hostOverride: string | undefined = process.env.REACT_APP_NEON_API_HOST;
    if (typeof hostOverride === 'string' && (hostOverride.length > 0)) {
      hostName = String(hostOverride);
    }
    return `${hostName}`;
  },
  getApiHost: (): string => (
    `${Env.getApiProtocol()}//${Env.getApiHostName()}`
  ),
};

export default Env;
