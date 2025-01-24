export interface CreatePlaylistRequest {
  name: string;
  description: string;
  public: boolean;
}

export interface PlaylistsListResponse {
  items: Playlist[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  images: {
    url: string;
    height?: number;
    width?: number;
  }[];
  owner: {
    display_name: string;
  };
  tracks: {
    total: number;
    href: string;
  };
  external_urls: {
    spotify: string;
  };
}

export interface Track {
  id: string;
  name: string;
  album: {
    name: string;
    images: {
      url: string;
    }[];
    external_urls: {
      spotify: string;
    }
  };
  artists: {
    name: string;
  }[];
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
}
