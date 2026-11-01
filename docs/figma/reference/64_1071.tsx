const imgProperty1Love = "https://www.figma.com/api/mcp/asset/3de9c4a3-36fd-4213-ae8f-4e5098854f82.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/90f7be3e-3ff2-4201-902c-cf3432d7d544.svg";
const imgProperty1Truck = "https://www.figma.com/api/mcp/asset/ace2798c-b26b-4dc8-83b7-af7f84a46302.svg";
const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/a5994345-65be-456c-bf12-a1e2088c2405.svg";
const imgNhMinhHaCommunity = "https://www.figma.com/api/mcp/asset/9d8a60c2-d71d-41d4-829b-6707049a8bd8.png";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/f6667b07-4f9b-487e-adad-551d4671c55c.svg";

type IconProps = {
  className?: string;
  property1?: "Love" | "Box" | "Truck" | "ChervonLeft";
};

function Icon({ className, property1 = "Love" }: IconProps) {
  const isBox = property1 === "Box";
  const isChervonLeft = property1 === "ChervonLeft";
  const isTruck = property1 === "Truck";
  return (
    <div className={className || `relative ${isChervonLeft ? "size-[24px]" : isTruck ? "size-[39px]" : isBox ? "overflow-clip size-[39px]" : "size-[31px]"}`} id={isChervonLeft ? "node-6_140" : isTruck ? "node-6_122" : isBox ? "node-6_109" : "node-6_107"}>
      {["Love", "Truck", "ChervonLeft"].includes(property1) && <img alt="" className="absolute block inset-0 max-w-none size-full" src={isChervonLeft ? imgProperty1ChervonLeft : isTruck ? imgProperty1Truck : imgProperty1Love} />}
      {isBox && (
        <div className="absolute inset-[9.54%_12.5%_8.33%_12.5%]" data-node-id="6:110" data-name="Group">
          <div className="absolute inset-[-3.12%_-3.42%_-1.66%_-3.42%]">
            <img alt="" className="block max-w-none size-full" src={imgGroup} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function U05BnDaDcXacMinh() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="64:1071" data-name="U05 · Bạn đã được xác minh">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="64:1072">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="64:1073">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="64:1074" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="ChervonLeft" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="64:1075" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="64:1076">
            Bạn đã được xác minh
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="64:1077">
            Chào mừng bạn tham gia ShareMeal
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="64:1080" data-name="Content">
        <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[24px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:1081" data-name="Frame">
          <div className="h-[160px] relative rounded-[16px] shrink-0 w-[310px]" data-node-id="73:1045" data-name="Ảnh minh họa / community">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaCommunity} />
          </div>
          <div className="overflow-clip relative shrink-0 size-[64px]" data-node-id="64:1082" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I64:1082;6:135" data-name="Group">
              <div className="absolute inset-[-1.83%_-2.08%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[26px] text-[color:var(--sm-ink,#173a30)] w-[310px]" data-node-id="64:1086">
            Sẵn sàng tạo nên những bữa ăn ý nghĩa
          </p>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[310px]" data-node-id="64:1087">
            Hồ sơ của bạn đã được duyệt. Quyền sử dụng được mở theo vai trò đã đăng ký.
          </p>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:1088" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="64:1089">
            Bạn có thể bắt đầu
          </p>
          <button className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:1090" data-name="go/donorHome">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="Box" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="64:1096" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="64:1097">
                Người cho
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="64:1098">
                Đăng món ăn và xác nhận bàn giao
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="64:1099">
              ›
            </p>
          </button>
          <button className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:1100" data-name="go/charityHome">
            <Icon className="relative shrink-0 size-[24px]" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="64:1103" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="64:1104">
                Tổ chức từ thiện
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="64:1105">
                Đăng nhu cầu, gửi yêu cầu nhận
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="64:1106">
              ›
            </p>
          </button>
          <button className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:1107" data-name="go/volunteerHome">
            <Icon className="relative shrink-0 size-[24px]" property1="Truck" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="64:1110" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="64:1111">
                Tình nguyện viên
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="64:1112">
                Tìm chuyến phù hợp và nhận việc
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="64:1113">
              ›
            </p>
          </button>
        </div>
        <button className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="64:1114" data-name="go/roleHome">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I64:1114;6:171">
            Vào trang chủ theo vai trò
          </p>
        </button>
      </div>
    </div>
  );
}
