export interface Post {
  id: string;
  title: string;
  slug: string;
  description?: string;
  date: string;
  tags?: string[];
  category?: string;
  thumbnail?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description?: string;
  date: string;
  tags?: string[];
  category?: string;
  thumbnail?: string;
  content: string;
  githubUrl?: string;
  demoUrl?: string;
  images?: string[];
}

export interface NotionBlock {
  id: string;
  type: string;
  [key: string]: unknown;
}

export interface NotionPage {
  id: string;
  properties: Record<string, unknown>;
}

export interface NotionRichText {
  plain_text: string;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
  };
  href?: string | null;
}
