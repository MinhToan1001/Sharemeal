const imgProperty1Love = "https://www.figma.com/api/mcp/asset/ab26b342-f131-42c5-9853-22a29861ba35.svg";
const imgProperty1Cross = "https://www.figma.com/api/mcp/asset/6d98c980-0922-4de5-8fc5-8f36592d9e11.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/6de7eeb9-eccf-4591-acae-14e626610014.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/258215a3-afc6-4a9a-b10f-5c2362faea43.svg";

type IconProps = {
  className?: string;
  property1?: "Love" | "Cross";
};

function Icon({ className, property1 = "Love" }: IconProps) {
  const isCross = property1 === "Cross";
  return (
    <div className={className || `relative ${isCross ? "size-[24px]" : "size-[31px]"}`} id={isCross ? "node-6_152" : "node-6_107"}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={isCross ? imgProperty1Cross : imgProperty1Love} />
    </div>
  );
}

export default function Component68() {
  return (
    <div className="bg-[#f6f8f5] relative size-full" data-node-id="6:3567" data-name="68">
      <div className="absolute content-stretch flex h-[56px] items-center justify-end left-0 overflow-clip px-[16px] py-[24px] top-0 w-[402px]" data-node-id="6:3568">
        <div className="content-stretch flex items-center relative shrink-0" data-node-id="6:3569">
          <Icon className="relative shrink-0 size-[16px]" property1="Cross" />
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-white bottom-0 content-stretch flex flex-col gap-[10px] items-start left-1/2 overflow-clip px-[35px] py-[6px] w-[402px]" data-node-id="6:3571">
        <div className="bg-[#006642] content-stretch flex h-[44px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-full" data-node-id="6:3572" data-name="Button">
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap" data-node-id="I6:3572;6:171">
            Mở mã QR bàn giao
          </p>
        </div>
        <div className="content-stretch flex h-[44px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-full" data-node-id="6:3573" data-name="Button">
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#1b6a4a] text-[18px] whitespace-nowrap" data-node-id="I6:3573;6:171">
            Thêm vào lịch của tôi
          </p>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute contents left-[calc(50%+0.5px)] top-[89px]" data-node-id="6:3574">
        <div className="absolute bg-[#d8f6e0] left-[113px] overflow-clip rounded-[69px] size-[80px] top-[90px]" data-node-id="6:3575">
          <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[normal] left-[calc(50%-17px)] not-italic text-[#1b6a4a] text-[24px] top-[calc(50%-15px)] whitespace-nowrap" data-node-id="6:3576">
            HS
          </p>
        </div>
        <div className="-translate-x-1/2 absolute bg-[#fef0d5] left-[calc(50%+48.5px)] overflow-clip rounded-[100px] size-[81px] top-[89px]" data-node-id="6:3577">
          <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[normal] left-[calc(50%-18.5px)] not-italic text-[#a3732f] text-[24px] top-[calc(50%-13.5px)] whitespace-nowrap" data-node-id="6:3578">
            BM
          </p>
        </div>
        <div className="absolute bg-[#1b6a4a] border-3 border-solid border-white left-[181px] overflow-clip rounded-[12px] size-[39px] top-[110px]" data-node-id="6:3579">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] size-[24px] top-[calc(50%+0.5px)]" data-node-id="6:3580" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
        </div>
      </div>
      <div className="[word-break:break-word] absolute contents leading-[normal] left-[59px] not-italic top-[194px]" data-node-id="6:3581">
        <p className="absolute font-['Inter:Bold'] font-bold left-[calc(50%-129px)] text-[#1b6a4a] text-[24px] top-[194px] whitespace-nowrap" data-node-id="6:3582">
          Ghép cặp thành công!
        </p>
        <p className="-translate-x-1/2 absolute font-['Inter:Medium'] font-medium left-[206.5px] text-[14px] text-[color:var(--des-text,#919191)] text-center top-[235px] w-[295px]" data-node-id="6:3583">
          Quán Cơm Ba Miền sẽ trao 20 suất cơm gà cho Mái ấm Hoa Sen.
        </p>
      </div>
      <div className="[word-break:break-word] absolute bg-white border border-[#808080] border-solid content-stretch flex flex-col gap-[10px] items-start leading-[normal] left-[17px] not-italic overflow-clip px-[16px] py-[12px] rounded-[12px] text-[14px] top-[293px] w-[369px]" data-node-id="6:3584">
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full whitespace-nowrap" data-node-id="6:3585">
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[color:var(--des-text,#919191)]" data-node-id="6:3586">
            Giờ lấy
          </p>
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-black" data-node-id="6:3587">
            Hôm nay 19:30
          </p>
        </div>
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full whitespace-nowrap" data-node-id="6:3588">
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[color:var(--des-text,#919191)]" data-node-id="6:3589">
            Địa điểm lấy
          </p>
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-black" data-node-id="6:3590">
            24 Nguyễn Thị Minh Khai, Q.3
          </p>
        </div>
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="6:3591">
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[color:var(--des-text,#919191)] whitespace-nowrap" data-node-id="6:3592">
            Hình thức
          </p>
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-black w-[178px]" data-node-id="6:3593">
            Nhờ tình nguyện viên giao
          </p>
        </div>
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full whitespace-nowrap" data-node-id="6:3594">
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[color:var(--des-text,#919191)]" data-node-id="6:3595">
            Mã ghép cặp
          </p>
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-black" data-node-id="6:3596">
            GC-88213
          </p>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-[rgba(225,253,232,0.92)] content-stretch flex gap-[10px] items-start justify-center left-1/2 overflow-clip px-[16px] py-[12px] rounded-[12px] top-[454px] w-[370px]" data-node-id="6:3597">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-node-id="6:3598" data-name="Icon">
          <div className="absolute inset-[8.33%]" data-node-id="I6:3598;6:143" data-name="Group">
            <div className="absolute inset-[-5%]">
              <img alt="" className="block max-w-none size-full" src={imgGroup} />
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[0] min-w-px not-italic relative text-[#1b6a4a] text-[14px]" data-node-id="6:3599">
          <span className="font-['Inter:Bold'] font-bold leading-[normal]">Còn 2 giờ 10 phút đến giờ hẹn</span>
          <span className="leading-[normal]">. Chúng tôi sẽ nhắc bạn trước 30 phút</span>
        </p>
      </div>
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[44px] left-[30px] top-[744px] w-[342px]" data-node-id="84:1672" data-name="Prototype / Mở mã QR bàn giao" />
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[44px] left-[30px] top-[798px] w-[342px]" data-node-id="84:1674" data-name="Prototype / Thêm vào lịch của tôi" />
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[52px] left-[6px] top-[8px] w-[46px]" data-node-id="84:1874" data-name="Prototype / Quay lại" />
    </div>
  );
}
