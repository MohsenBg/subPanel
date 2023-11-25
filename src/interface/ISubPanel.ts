export interface ProxyConfig {
  name: string;
  type: string;
  domain: string;
  protocol: string;
  transport: string;
  security: string;
  link: string;
}

export interface Traffic {
  currentUsage: string;
  maxUsage: string;
  expired: string;
}

export interface UserPanelData {
  traffic: Traffic;
  configs: {
    table: ProxyConfig[];
  };
}
