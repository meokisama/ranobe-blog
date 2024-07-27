import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function BoosterAds() {
  return (
    <div className="mt-40 flex w-full flex-row justify-center items-center">
      <div className="max-w-6xl flex flex-col-reverse w-full overflow-hidden border pt-8">
        <div className="w-full">
          <Image
            src="/mignon.png"
            alt="giveaway booster banner"
            width={1000}
            height={1000}
            quality={100}
            className="w-full h-auto select-none pointer-events-none block mx-auto"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-8">
          {/* <div className="w-full h-full custom-caro absolute z-[-1] bg-[length:3vw_3vw] lg:bg-[length:1.2vw_1.2vw]"></div> */}
          <Image
            src="/booster-logo.webp"
            alt="giveaway booster logo"
            width={400}
            height={400}
            className="h-auto w-[55vw] lg:w-[20vw]"
          />
          <div className="w-[90%] xl:w-3/5 text-center">
            <h1 className="font-black text-2xl lg:text-3xl leading-6 text-cyan-700">
              Light Novel Giveaway Booster
            </h1>
            <p className="font-semibold text-lg text-gray-500 mt-1 leading-6">
              Lễ hội trắc nghiệm có thưởng hằng năm sắp quay trở lại!
            </p>
          </div>
          <p className="text-lg lg:text-xl leading-5 lg:leading-6 w-[90%] xl:w-3/5 text-justify lg:font-medium">
            Sự kiện được mong chờ nhất năm (của chúng tôi) đã đến, với tổng giá
            trị giải thưởng{" "}
            <strong className="font-black text-red-500">
              ít nhất 2.000.000đ mỗi kỳ
            </strong>
            ! Hãy chuẩn bị kiến thức đầy đủ để sẵn sàng tỏa sáng và chinh phục
            thử thách, giành lấy những phần thưởng xứng đáng nhất cho sự nỗ lực
            của bạn.
          </p>
          <div>
            <Button className="lg:text-lg py-5">
              Thông tin chi tiết <ArrowRightIcon className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
