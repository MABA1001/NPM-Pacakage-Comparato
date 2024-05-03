import { TRows } from '../global/types';

export const rowFormatter = (firstPackageData, secondPackageData) => {
  return [
    createData(
      'Description',
      firstPackageData.collected.metadata.name,
      secondPackageData.collected.metadata.description,
    ),
    createData(
      'Keywords',
      firstPackageData.collected.metadata.keywords
        ? firstPackageData.collected.metadata.keywords[0]
        : 'N/A',
      secondPackageData.collected.metadata.keywords
        ? secondPackageData.collected.metadata.keywords[0]
        : 'N/A',
    ),
    createData(
      'License',
      firstPackageData.collected.metadata.license
        ? firstPackageData.collected.metadata.license
        : 'N/A',
      secondPackageData.collected.metadata.license
        ? secondPackageData.collected.metadata.license
        : 'N/A',
    ),
    createData(
      'Last Modification Date',
      firstPackageData.analyzedAt.slice(0, 10),
      secondPackageData.analyzedAt.slice(0, 10),
    ),
    createData(
      'Authors/Publishers',
      firstPackageData.collected.metadata.author
        ? firstPackageData.collected.metadata.author.name
        : 'N/A',
      secondPackageData.collected.metadata.author
        ? secondPackageData.collected.metadata.author.name
        : 'N/A',
    ),
    createData(
      'Maintainers',
      firstPackageData.collected.metadata.maintainers[0]
        ? firstPackageData.collected.metadata.maintainers[0].username
        : 'null',
      secondPackageData.collected.metadata.maintainers[0]
        ? secondPackageData.collected.metadata.maintainers[0].username
        : 'null',
    ),
  ];
};

function createData(
  packageName: string,
  firstPackageValue: string | number,
  secondPackageValue: string | number,
): TRows {
  return { packageName, firstPackageValue, secondPackageValue };
}
