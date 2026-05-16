import Image from "next/image";

export default function Bento() {
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="grid min-h-screen w-[95%] xl:w-[80%] grid-cols-5 gap-2 xl:gap-4">
        <div className="hidden group relative sm:block col-span-2 row-span-2 shadow-xs backdrop-blur-sm border dark:border-none rounded-xl lg:rounded-2xl overflow-hidden dark:none dark:shadow-[0_0_10px_rgba(0,0,0,0.3)] dark:bg-[var(--accent)]">
          <Image
            src="/bento/ginko.png"
            alt="sora ginko"
            width={800}
            height={800}
            quality={100}
            className="w-full h-full object-cover object-top select-none pointer-events-none group-hover:scale-105 transition ease-linear origin-top"
          />
          <div className="absolute -z-9 inset-0 bg-[url(/grid.svg)] bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] translate-y-[-2px] dark:invert"></div>
        </div>
        <div className="col-span-5 sm:col-span-3 bento-item p-4 relative">
          <Image
            src="/beams.jpg"
            alt="background image"
            width={1308}
            height={1000}
            className="absolute w-full h-full -z-10 opacity-50 dark:hidden dark:opacity-50 select-none pointer-events-none"
          />
          <div className="absolute -z-9 inset-0 bg-[url(/grid.svg)] bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] translate-y-[-2px] dark:invert"></div>
          <p>
            Thành thật mà nói thì bạn cần phải có IQ rất cao để hiểu được công dụng thật sự của tiểu thuyết ánh sáng. Tuy bề ngoài chỉ là một cuốn
            truyện thông thường, nhưng ẩn giấu trong nó là những giá trị tiềm tàng mà không mấy ai tận dụng hết được.
          </p>
          <p>
            Tiểu thuyết ánh sáng có nhiều loại chất liệu và kích thước khác nhau: bìa dày, bìa mỏng, khổ to, khổ nhỏ đều được nhà xuất bản khéo lẹo
            chọn lựa để phù hợp với bàn tay quý giá của người mua. Đó là chưa nói đến những tấm hình minh họa tuyệt đẹp được những họa sĩ danh tiếng
            kỳ công vẽ nên, để rồi được nhà xuất bản chăm chút tỉ mỉ in lên trên bìa. Những fan ruột thấu hiểu được điều này; họ sở hữu đủ khả năng
            trí thức để biết loại nào phù hợp với bàn tay mình, bìa có phải best girl hay không, để nhận ra rằng nó không chỉ ngừng lại ở đó - nó còn
            có một công dụng đặc biệt khác là dùng để <strong className="text-red-500 font-black">lót chuột</strong>.
          </p>
          <p>
            Kết quả là một số người mua còn non nớt ở Việt Nam sẽ không nhận ra được công dụng thật sự của nó, để rồi phải bỏ thêm tiền mua những tấm
            lót chuột tầm thường khác. Chỉ mới nghĩ đến cảnh tượng người ta bỏ hàng đống tiền ra để mua tấm lót chuột của Razor thôi đã làm tôi cười
            mỏi mồm.
          </p>
        </div>
        <div className="col-span-2 sm:col-span-1 bento-item border-none group">
          <Image
            src="/bento/yue.jpg"
            alt="yue"
            width={400}
            height={400}
            className="w-full h-full object-cover object-center select-none pointer-events-none group-hover:scale-105 transition ease-linear origin-top"
          />
        </div>
        <div className="row-span-2 col-span-3 sm:row-span-1 sm:col-span-1 bento-item border-none group">
          <Image
            src="/bento/aobuta.jpg"
            alt="aobuta"
            width={800}
            height={800}
            className="w-full h-full object-cover object-center select-none pointer-events-none group-hover:scale-105 transition ease-linear origin-top"
          />
        </div>
        <div className="col-span-2 row-span-1 sm:col-span-1 sm:row-span-2 bento-item border-none group">
          <Image
            src="/bento/tanmoshi.jpg"
            alt="tanmoshi"
            width={800}
            height={800}
            className="w-full h-full object-cover object-center select-none pointer-events-none group-hover:scale-105 transition ease-linear origin-top"
          />
        </div>
        <div className="col-span-5 sm:col-span-3 row-span-2 bento-item p-6 xl:p-12 relative">
          <Image
            src="/beams.jpg"
            alt="background image"
            width={1308}
            height={1000}
            className="absolute w-full h-full -z-10 opacity-50 dark:hidden dark:opacity-50 select-none pointer-events-none"
          />
          <div className="absolute -z-9 inset-0 bg-[url(/grid.svg)] bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] translate-y-[-2px] dark:invert"></div>
          <h1 className="text-2xl xl:text-5xl font-black mb-2 lg:mb-6 text-left text-gray-600 dark:text-[var(--foreground)]">
            LIGHT NOVEL LÀ CÁI CHẾT TỪ TỪ CỦA HÀNH TINH!
          </h1>
          <p>
            Người đọc Light Novel là thảm họa cho nền kinh tế đất nước: họ không mua những tiểu thuyết kinh điển của nhà văn trong nước, họ không cần
            trả tiền cho những ấn phẩm bìa cứng đắt tiền của các lĩnh vực khoa học khác, họ không cần mua lót chuột, lót ly, tranh treo tường hay
            những standee đắt tiền, họ không cần đến thư viện, họ không trả tiền cho những hoạt động vui chơi mua sắm bên ngoài mà chỉ ngồi ở nhà đọc
            truyện, họ không bị cận thị nặng do xem điện thoại quá nhiều, không phải bỏ tiền đi khám mắt, không tốn tiền mua kính và thuốc nhỏ mắt,
            không bị stress và không cần bác sĩ tâm lý.
          </p>
          <p>
            Ngược lại, mỗi tiệm net mới đều tạo ra ít nhất 10 việc làm: 3 thu ngân, 3 phục vụ, 2 đầu bếp, 2 bảo vệ và tất nhiên là GDP mang lại cho
            đất nước khi trang bị những PC tối tân hay tai nghe bàn phím đắt tiền.
          </p>
          <p>
            Do đó, hãy lựa chọn thật kĩ: <strong className="text-red-500 font-black">một độc giả Light Novel</strong>
            {" hay "}
            <strong className="text-red-500 font-black">một tiệm net?</strong>
          </p>
          <p>Đáng để suy ngẫm.</p>
          <p>Web novel còn kinh khủng hơn, độc giả web novel thậm chí còn chẳng mua Light Novel.</p>
        </div>
        <div className="bento-item border-none col-span-3 sm:col-span-1 row-span-2 sm:row-span-1 group">
          <Image
            src="/bento/spyroom.jpg"
            alt="spyroom"
            width={400}
            height={400}
            className="w-full h-full object-cover object-center select-none pointer-events-none group-hover:scale-105 transition ease-linear origin-top"
          />
        </div>
        <div className="col-span-2 bento-item border-none group">
          <Image
            src="/bento/elaina.jpg"
            alt="tanmoshi"
            width={800}
            height={800}
            className="w-full h-full object-cover object-center select-none pointer-events-none group-hover:scale-105 transition ease-linear origin-top"
          />
        </div>
        <div className="col-span-2 sm:col-span-1 bento-item border-none group">
          <Image
            src="/bento/mobuseka.jpg"
            alt="mobuseka"
            width={300}
            height={400}
            className="w-full h-full object-cover object-center select-none pointer-events-none group-hover:scale-105 transition ease-linear origin-top"
          />
        </div>
        <div className="hidden group relative sm:block shadow-xs backdrop-blur-sm border dark:border-none rounded-xl lg:rounded-2xl overflow-hidden dark:none dark:shadow-[0_0_10px_rgba(0,0,0,0.3)] dark:bg-[var(--accent)]">
          <Image
            src="/bento/konosuba.png"
            alt="konosuba"
            width={400}
            height={400}
            className="w-full h-full object-cover object-center select-none pointer-events-none group-hover:scale-105 transition ease-linear origin-top"
          />
          <div className="absolute -z-9 inset-0 bg-[url(/grid.svg)] bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] translate-y-[-2px] dark:invert"></div>
        </div>
        <div className="col-span-5 sm:col-span-3 bento-item p-6 relative">
          <Image
            src="/beams.jpg"
            alt="background image"
            width={1308}
            height={1000}
            className="absolute w-full h-full -z-10 opacity-50 dark:hidden dark:opacity-50 select-none pointer-events-none"
          />
          <div className="absolute -z-9 inset-0 bg-[url(/grid.svg)] bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] translate-y-[-2px] dark:invert"></div>
          <p>
            Nói nhỏ cho nghe nhé. Thống kê khoa học đã cho thấy 100% những người đọc Light Novel không phải là tỷ phú được chịch dạo với những cô
            người mẫu siêu hót, và cũng chẳng làm được gì có ích cho xã hội. Tất cả những đứa đọc Light Novel đều toàn là phế phẩm và cách duy nhất để
            bọn chúng cảm thấy tự hào về bản thân là đi đọc truyện xàm bô bí đao.
          </p>
          <p>
            Quả là nực cười, đám đó tự lãng phí thời giờ chỉ để có được cảm giác lên đồng nhất thời. Họ làm như mình là người tốt nhất trên cả thế
            gian khi lập bầy đàn với nhau và cười nhạo những kẻ không biết gì về Light Novel - cái thể loại truyện suy đồi nhất mà nhân loại từng ị
            ra.
          </p>
          <p>
            Trước khi vào đây cãi lại, nên nhớ tôi chỉ đang nói sự thật, không hề có ý xúc phạm ai cả. Muốn tiếp tục giả vờ như mình không phải hạng
            người như thế cũng được thôi, muốn nói mấy câu như{" "}
            <strong className="text-red-500 font-black">
              “Bọn tôi là bằng hữu đọc LN cùng nhau, bọn tôi thích shitpost, thích homopost, có hại gì ai đâu.”
            </strong>{" "}
            cũng được thôi. Nhưng trong thân tâm mấy người chắc chắn đều nhận ra tôi vừa vạch trần bộ mặt thật của tất cả đám đọc Light Novel. Cái thú
            vui này chỉ có một mục đích là thủ dâm, không hơn, không kém.
          </p>
        </div>
      </div>
    </div>
  );
}
