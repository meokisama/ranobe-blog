import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";

type DetailProps = {
  jp: string;
  vn: string;
  romaji: string;
  publisher: string;
  author: string;
  illustrator: string;
  release: string;
  category: string;
  volume: string;
  vi_trans: string;
  vi_trans_url: string;
  en_trans: string;
  en_trans_url: string;
  safety: string;
};

export default function SeriesDetail({
  jp,
  vn,
  romaji,
  publisher,
  author,
  illustrator,
  release,
  category,
  volume,
  vi_trans,
  vi_trans_url,
  en_trans,
  en_trans_url,
  safety,
}: DetailProps) {
  const details = [
    {
      label: "Tựa tiếng Nhật",
      value: (
        <p>
          <span className="font-mincho text-base leading-6">{jp}</span> ({vn})
        </p>
      ),
    },
    {
      label: "Romaji",
      value: romaji,
    },
    {
      label: "NXB",
      value: publisher,
    },
    {
      label: "Tác giả",
      value: author,
    },
    {
      label: "Minh họa",
      value: illustrator,
    },
    {
      label: "Ngày phát hành",
      value: release,
    },
    {
      label: "Thể loại",
      value: category,
    },
    {
      label: "Số tập",
      value: volume,
    },
    {
      label: "Bản dịch",
      value:
        en_trans !== "" ? (
          <div>
            <Link href={en_trans_url} target="_blank">
              <span className="font-bold text-red-500">{en_trans}</span>
            </Link>
            {" | "}
            <Link href={vi_trans_url} target="_blank">
              <span className="font-bold text-red-500">{vi_trans}</span>
            </Link>
          </div>
        ) : (
          <Link href={vi_trans_url} target="_blank">
            <span className="font-bold text-red-500">{vi_trans}</span>
          </Link>
        ),
    },
    {
      label: "Độ an toàn",
      value: safety,
    },
  ];

  return (
    <div className="my-6 lg:my-12">
      <Table className="text-lg lg:text-xl my-4 shadow-[0_3px_8px_rgba(0,0,0,0.16)] dark:shadow-[0_0_10px_rgba(0,0,0,0.6)] rounded-lg lg:rounded-xl px-2 py-1 max-w-[98%] block mx-auto">
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
      {/* <p className="text-center text-lg lg:text-xl italic font-semibold text-gray-600 dark:text-white">
        Bảng thông tin chi tiết
      </p> */}
    </div>
  );
}
