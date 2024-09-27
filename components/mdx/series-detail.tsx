import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";

interface Detail {
  jp: string;
  vn: string;
  romaji: string;
  publisher: string;
  author: string;
  illustrator: string;
  release: string;
  category: string;
  volume: string;
  en_trans: string;
  en_trans_url: string;
  vi_trans: string;
  vi_trans_url: string;
  safety: string;
}

export default function SeriesDetail({ detail }: { detail: Detail }) {
  const details = [
    {
      label: "Tựa tiếng Nhật",
      value: (
        <p>
          <span className="font-mincho text-base leading-6">{detail.jp}</span> (
          {detail.vn})
        </p>
      ),
    },
    {
      label: "Romaji",
      value: detail.romaji,
    },
    {
      label: "NXB",
      value: detail.publisher,
    },
    {
      label: "Tác giả",
      value: detail.author,
    },
    {
      label: "Minh họa",
      value: detail.illustrator,
    },
    {
      label: "Ngày phát hành",
      value: detail.release,
    },
    {
      label: "Thể loại",
      value: detail.category,
    },
    {
      label: "Số tập",
      value: detail.volume,
    },
    {
      label: "Bản dịch",
      value:
        detail.en_trans !== "" ? (
          <div>
            {detail.en_trans_url ? (
              <Link href={detail.en_trans_url} target="_blank">
                <span className="font-bold text-blue-500">
                  {detail.en_trans}
                </span>
              </Link>
            ) : (
              <span className="font-bold text-red-500">{detail.en_trans}</span>
            )}
            {" | "}
            {detail.vi_trans_url ? (
              <Link href={detail.vi_trans_url} target="_blank">
                <span className="font-bold text-blue-500">
                  {detail.vi_trans}
                </span>
              </Link>
            ) : (
              <span className="font-bold text-red-500">{detail.vi_trans}</span>
            )}
          </div>
        ) : detail.vi_trans_url ? (
          <Link href={detail.vi_trans_url} target="_blank">
            <span className="font-bold text-blue-500">{detail.vi_trans}</span>
          </Link>
        ) : (
          <span className="font-bold text-red-500">{detail.vi_trans}</span>
        ),
    },
    {
      label: "Độ an toàn",
      value: detail.safety,
    },
  ];

  return (
    <div className="my-6 lg:my-12">
      <Table className="text-lg lg:text-xl my-4 shadow-[0_3px_8px_rgba(0,0,0,0.16)] dark:shadow-[0_0_10px_rgba(0,0,0,0.6)] rounded-lg lg:rounded-xl px-4 py-2 max-w-[98%] block mx-auto">
        <TableBody>
          {details.map((detail) => (
            <TableRow key={detail.label}>
              <TableCell className="font-bold w-[28%] lg:w-[200px] text-gray-700 dark:text-white">
                {detail.label}
              </TableCell>
              <TableCell className="leading-5 lg:leading-6">
                {detail.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
