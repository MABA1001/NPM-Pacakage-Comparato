import { useState, useEffect } from "react";
import DownloadsGraph from "./DownloadsGraph";
import { TPackage,TComparisonTableProps } from "../global/types";
import { fetchData } from "../utils/apiUtils";
import { rowFormatter } from "../utils/rowFormatter";
import TableComponent from "./TableComponent";



export default function ComparisonTable({ selectedPackages }:TComparisonTableProps) {
  const [firstPackageData, setfirstPackageData] = useState<
    TPackage | undefined
  >();
  const [secondPackageData, setSecondPackageData] = useState<
    TPackage | undefined
  >();
  
  useEffect(() => {
    const pkgOnePromise = fetchData(
      selectedPackages[0].package.name,
      setfirstPackageData,
    );
    const pkgTwoPromise = fetchData(
      selectedPackages[1].package.name,
      setSecondPackageData,
    );
    Promise.all([pkgOnePromise, pkgTwoPromise]);
  }, [selectedPackages]);
 

  return (
    <>
      {firstPackageData && secondPackageData&&(
        <>
          <TableComponent
            rows={rowFormatter(firstPackageData, secondPackageData)}
            firstPackageName={firstPackageData?.collected.metadata.name}
            secondPackageName={secondPackageData?.collected.metadata.name}
          />

          <DownloadsGraph
            packageOne={firstPackageData}
            packageTwo={secondPackageData}
          />
        </>
      )}
    </>
  );
}
