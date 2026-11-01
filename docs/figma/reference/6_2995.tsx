const imgGroup = "https://www.figma.com/api/mcp/asset/f1a46146-9a8a-4def-849d-a9b1b52a5682.svg";
const imgTablerBox = "https://www.figma.com/api/mcp/asset/ea5322d1-5994-4d90-afa8-a4dfa1f751ee.svg";
const imgTablerDeviceTv = "https://www.figma.com/api/mcp/asset/76ae69c4-ae8d-4bbc-9579-323d62c096c8.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/510b9fba-3df3-46f4-858b-08b70625f92f.svg";
const imgGroup2 = "https://www.figma.com/api/mcp/asset/62fe9fdc-7fa9-495d-8dd3-2ea383fb5a39.svg";
const imgLine8 = "https://www.figma.com/api/mcp/asset/4731a735-ad72-4a4e-b6cb-6da6c352967b.svg";

function TablerCamera({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[24px]"} data-node-id="6:3022" data-name="tabler:camera">
      <div className="absolute inset-[16.67%_12.5%]" data-node-id="6:3023" data-name="Group">
        <div className="absolute inset-[-6.25%_-5.56%]">
          <img alt="" className="block max-w-none size-full" src={imgGroup} />
        </div>
      </div>
    </div>
  );
}

function TablerBox({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[33px]"} data-node-id="6:3016" data-name="tabler:box">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTablerBox} />
    </div>
  );
}

function TablerDeviceTv({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[33px]"} data-node-id="6:3012" data-name="tabler:device-tv">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTablerDeviceTv} />
    </div>
  );
}

function TablerClock({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[33px]"} data-node-id="6:3006" data-name="tabler:clock">
      <div className="absolute inset-[12.5%]" data-node-id="6:3007" data-name="Group">
        <div className="absolute inset-[-4.04%]">
          <img alt="" className="block max-w-none size-full" src={imgGroup1} />
        </div>
      </div>
    </div>
  );
}

function TablerCar({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[33px]"} data-node-id="6:3000" data-name="tabler:car">
      <div className="absolute bottom-[20.83%] left-[12.5%] right-[12.5%] top-1/4" data-node-id="6:3001" data-name="Group">
        <div className="absolute inset-[-5.59%_-4.04%]">
          <img alt="" className="block max-w-none size-full" src={imgGroup2} />
        </div>
      </div>
    </div>
  );
}

export default function Component73() {
  return (
    <div className="bg-[#f6f8f5] relative size-full" data-node-id="6:2995" data-name="73">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[22px] justify-center leading-[0] left-[19px] not-italic text-[16px] text-black top-[103px] w-[184px]" data-node-id="6:2996">
        <p className="leading-[normal]">Bạn gặp vấn đề gì?</p>
      </div>
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[22px] justify-center leading-[0] left-[19px] not-italic text-[16px] text-black top-[334px] w-[184px]" data-node-id="6:2997">
        <p className="leading-[normal]">Mô tả ngắn</p>
      </div>
      <div className="absolute bg-[#fbe6e3] border border-[#a31919] border-solid h-[86px] left-[19px] overflow-clip rounded-[15px] top-[129px] w-[177px]" data-node-id="6:2998">
        <a className="-translate-y-1/2 [word-break:break-word] absolute cursor-pointer flex flex-col font-['Inter:Bold'] font-bold h-[16px] justify-center leading-[0] left-[25px] not-italic text-[#a31919] text-[14px] top-[58px] w-[126px]" data-node-id="6:2999">
          <p className="leading-[normal]">Hỏng xe/ hết xăng</p>
        </a>
        <TablerCar className="absolute left-[71px] size-[33px] top-[13px]" />
      </div>
      <div className="absolute bg-white border border-[#717171] border-solid h-[86px] left-[206px] overflow-clip rounded-[15px] top-[129px] w-[177px]" data-node-id="6:3004">
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[16px] justify-center leading-[0] left-[40px] not-italic text-[#717171] text-[14px] top-[58px] w-[95px]" data-node-id="6:3005">
          <p className="leading-[normal]">Kẹt xe, trễ giờ</p>
        </div>
        <TablerClock className="absolute left-[71px] size-[33px] top-[13px]" />
      </div>
      <div className="absolute bg-white border border-[#717171] border-solid h-[86px] left-[206px] overflow-clip rounded-[15px] top-[226px] w-[177px]" data-node-id="6:3010">
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[16px] justify-center leading-[0] left-[20px] not-italic text-[#717171] text-[14px] top-[58px] w-[136px]" data-node-id="6:3011">
          <p className="leading-[normal]">Không liên lạc được</p>
        </div>
        <TablerDeviceTv className="absolute left-[71px] size-[33px] top-[13px]" />
      </div>
      <div className="absolute bg-white border border-[#717171] border-solid h-[86px] left-[19px] overflow-clip rounded-[15px] top-[226px] w-[177px]" data-node-id="6:3014">
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[16px] justify-center leading-[0] left-[8px] not-italic text-[#717171] text-[14px] top-[58px] w-[159px]" data-node-id="6:3015">
          <p className="leading-[normal]">Thực phẩm bị đổ/ hỏng</p>
        </div>
        <TablerBox className="absolute left-[71px] size-[33px] top-[13px]" />
      </div>
      <div className="absolute bg-white border border-[#717171] border-solid h-[86px] left-[19px] overflow-clip rounded-[15px] top-[348px] w-[364px]" data-node-id="6:3018">
        <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold h-[49px] leading-[normal] left-[15px] not-italic text-[#717171] text-[14px] top-[14px] w-[328px]" data-node-id="6:3019">
          Xe bị xẹp lốp trên đường Nam Kỳ Khởi Nghĩa, còn khoảng 20 phút để xử llý.
        </p>
      </div>
      <div className="absolute bg-white border border-[#717171] border-dashed h-[72px] left-[19px] overflow-clip rounded-[15px] top-[448px] w-[364px]" data-node-id="6:3020">
        <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold h-[17px] leading-[normal] left-[50px] not-italic text-[#006642] text-[14px] top-[26px] w-[182px]" data-node-id="6:3021">
          Đính kèm ảnh hiện trường
        </p>
        <TablerCamera className="absolute left-[16px] size-[24px] top-[23px]" />
      </div>
      <div className="absolute bg-[#e4eef8] h-[53px] left-[19px] overflow-clip rounded-[15px] top-[534px] w-[364px]" data-node-id="6:3026">
        <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold h-[31px] leading-[normal] left-[45px] not-italic text-[#00488f] text-[13px] top-[11px] w-[304px]" data-node-id="6:3027">
          Vị trí hiện tại sẽ được gửi kèm để điều phối tìm người hỗ trợ gần nhất.
        </p>
      </div>
      <div className="absolute bg-white border border-[#919191] border-solid h-[81px] left-0 overflow-clip top-[-1px] w-[402px]" data-node-id="6:3028" data-name="32">
        <div className="absolute flex h-[14px] items-center justify-center left-[30px] top-[35px] w-[7.5px]" data-node-id="6:3029">
          <div className="flex-none rotate-90">
            <div className="h-[7.5px] relative w-[14px]">
              <div className="absolute inset-[-13.33%_-7.14%_-19.55%_-7.14%]">
                <img alt="" className="block max-w-none size-full" src={imgLine8} />
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[28px] justify-center leading-[0] left-[66px] not-italic text-[20px] text-black top-[37px] w-[232px]" data-node-id="6:3030">
          <p className="leading-[normal]">Báo sự cố giữa đường</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular'] font-normal h-[14px] justify-center leading-[0] left-[66px] not-italic text-[#717171] text-[12px] top-[56px] w-[232px]" data-node-id="6:3031">
          <p className="leading-[normal]">Chuyến GC-88213 - đang giao</p>
        </div>
      </div>
      <div className="absolute bg-white border border-[#919191] border-solid h-[91px] left-0 overflow-clip top-[783px] w-[402px]" data-node-id="6:3032">
        <div className="absolute h-[55px] left-[187px] overflow-clip top-[16px] w-[193px]" data-node-id="6:3033">
          <div className="absolute bg-[#a31919] h-[54px] left-0 rounded-[15px] top-px w-[193px]" data-node-id="6:3034" />
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[50px] not-italic text-[16px] text-white top-[27.5px] whitespace-nowrap" data-node-id="6:3035">
            <p className="leading-[normal]">Gửi báo cáo</p>
          </div>
        </div>
        <div className="absolute h-[55px] left-[22px] overflow-clip top-[16px] w-[152px]" data-node-id="6:3036">
          <div className="absolute bg-white border border-[#d0caca] border-solid h-[54px] left-0 rounded-[15px] top-0 w-[152px]" data-node-id="6:3037" />
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[25px] not-italic text-[16px] text-black top-[27.5px] whitespace-nowrap" data-node-id="6:3038">
            <p className="leading-[normal]">Gọi điều phối</p>
          </div>
        </div>
      </div>
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[55px] left-[182px] top-[795px] w-[203px]" data-node-id="84:1654" data-name="Prototype / Gửi báo cáo" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[55px] left-[17px] top-[795px] w-[162px]" data-node-id="84:1656" data-name="Prototype / Gọi điều phối" />
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[52px] left-[6px] top-[8px] w-[46px]" data-node-id="84:1862" data-name="Prototype / Quay lại" />
    </div>
  );
}
