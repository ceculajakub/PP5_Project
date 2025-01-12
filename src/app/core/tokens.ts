import { InjectionToken } from "@angular/core";

export const API_CONFIG = new InjectionToken<{ api_url: string; }>('API_CONFIG');
