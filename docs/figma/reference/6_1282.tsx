const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/82735166-72d3-41e8-b733-dc87d35f84f1.svg";
const imgNhMinhHaFood = "https://www.figma.com/api/mcp/asset/b97d521a-d852-4e8f-8193-ac2808d62fa4.png";
const imgGroup = "https://www.figma.com/api/mcp/asset/b189f79a-8dca-487c-9a75-993facc3c967.svg";

type IconProps = {
  className?: string;
  property1?: "ChervonLeft";
};

function Icon({ className, property1 = "ChervonLeft" }: IconProps) {
  return (
    <div className={className || "relative size-[24px]"} data-node-id="6:140">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgProperty1ChervonLeft} />
    </div>
  );
}

export default function C02CmGaXiM() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="6:1282" data-name="C02 · Cơm gà xối mỡ">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="73:1132">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="73:1133">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="73:1134" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="73:1135" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="73:1136">
            Cơm gà xối mỡ
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="73:1137">
            Bếp Nhà Lan · Người cho đã xác minh
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="73:1140" data-name="Content">
        <div className="h-[236px] relative rounded-[16px] shrink-0 w-[358px]" data-node-id="73:1141" data-name="Ảnh minh họa / food">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaFood} />
        </div>
        <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-[358px]" data-node-id="73:1142" data-name="Frame">
          <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[72px]" data-node-id="73:1143" data-name="Frame">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="73:1144">
              Còn nóng
            </p>
          </div>
          <div className="bg-[var(--sm-amberBg,#fff0d7)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[150px]" data-node-id="73:1145" data-name="Frame">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-amber,#a35a09)] whitespace-nowrap" data-node-id="73:1146">
              20 suất còn lại
            </p>
          </div>
        </div>
        <div className="[word-break:break-word] bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start leading-[1.4] not-italic overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="73:1147" data-name="Frame">
          <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="73:1148">
            Bữa ăn mới nấu, sẵn sàng chia sẻ
          </p>
          <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="73:1149">
            Gà chiên, cơm trắng và rau ăn kèm. Đóng riêng từng hộp sạch, chưa ăn dở.
          </p>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="73:1150" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="73:1151">
              Giờ chế biến
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="73:1152">
              17:00 hôm nay
            </p>
          </div>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="73:1153" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="73:1154">
              Dùng tốt nhất trước
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="73:1155">
              23:00 hôm nay
            </p>
          </div>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="73:1156" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="73:1157">
              Khung giờ lấy
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="73:1158">
              19:00–20:30
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-amberBg,#fff0d7)] content-stretch flex gap-[10px] items-center overflow-clip p-[14px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="73:1159" data-name="Frame">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="73:1160" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I73:1160;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-amber,#a35a09)] w-[298px]" data-node-id="73:1164">
            Có thể chứa trứng. Vui lòng đối chiếu nhu cầu trước khi đặt nhận.
          </p>
        </div>
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="73:1165" data-name="go/requestForm">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I73:1165;6:171">
            Gửi yêu cầu nhận
          </p>
        </a>
      </div>
    </div>
  );
}
