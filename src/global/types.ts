export type TPackage = {
  analyzedAt: string;
  collected: TCollected;
  evaluation: TEvaluation;
};

type TCollected = {
  metadata: TMetadata;
  npm: TNpm;
};

type TEvaluation = {
  popularity: { communityInterest: number; downloadsCount: number };
  quality: { carefulness: number; health: number; tests: number };
};

type TMetadata = {
  author: { name: string; email: string };
  description: string;
  keywords: Array<string>;
  links: { npm: string; homepage: string; respository: string };
  maintainers: Array<TMaintainers>;
  publisher: { username: string; email: string };
  name: string;
  license: string;
};

type TNpm = {
  downloads: TDownloads;
  starsCount: number;
};

type TDownloads = {
  index: number;
  downloadsData: TDownloadsData;
};

type TDownloadsData = {
  from: string;
  to: string;
  count: number;
};

type TMaintainers = {
  username: string;
  email: string;
};

export type TRows = {
  packageName: string;
  firstPackageValue: string | number;
  secondPackageValue: string | number;
};

export type DateArray = Date[];
export type NumberArray = number[];

export interface PackageData {
  collected: {
    npm: {
      downloads: {
        from: string;
        count: number;
      }[];
    };
  };
}
