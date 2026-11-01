const imgProperty1Love = "https://www.figma.com/api/mcp/asset/7013ab73-1a52-4b85-9dc8-a6d2439b7744.svg";
const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/b823edf7-40cd-44e5-9270-c6dc5de722f0.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/6e6bce58-1083-4b9e-a6a0-997412c050ff.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/6e8192d2-eab1-4c5c-8a9f-ffbbbb8d191a.svg";

type IconProps = {
  className?: string;
  property1?: "Love" | "ChervonLeft";
};

function Icon({ className, property1 = "Love" }: IconProps) {
  const isChervonLeft = property1 === "ChervonLeft";
  return (
    <div className={className || `relative ${isChervonLeft ? "size-[24px]" : "size-[31px]"}`} id={isChervonLeft ? "node-6_140" : "node-6_107"}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={isChervonLeft ? imgProperty1ChervonLeft : imgProperty1Love} />
    </div>
  );
}

export default function U17ChXacNhnBanGiao() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="65:1126" data-name="U17 · Chờ xác nhận bàn giao">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="65:1127">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="65:1128">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="65:1129" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="ChervonLeft" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="65:1130" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="65:1131">
            Chờ xác nhận bàn giao
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="65:1132">
            CG-512 · Bạn đã đến Mái ấm Hoa Sen
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="65:1135" data-name="Content">
        <div className="bg-[var(--sm-blueBg,#e9f3f8)] content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[24px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="65:1136" data-name="Frame">
          <div className="relative shrink-0 size-[50px]" data-node-id="65:1137" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[25px] text-[color:var(--sm-ink,#173a30)] w-[310px]" data-node-id="65:1139">
            Cùng kiểm tra để trao đúng bữa ăn
          </p>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[310px]" data-node-id="65:1140">
            Người nhận kiểm tra số lượng và xác nhận trên ứng dụng của tổ chức.
          </p>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="65:1141" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="65:1142">
            Bàn giao tại điểm nhận
          </p>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="65:1143" data-name="Frame">
            <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 size-[26px]" data-node-id="65:1144" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="65:1145">
                ✓
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[286px]" data-node-id="65:1146" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] w-[286px]" data-node-id="65:1147">
                Đã đến điểm nhận
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="65:1148">
                12 Lê Hồng Phong, Q.5
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="65:1149" data-name="Frame">
            <div className="bg-[var(--sm-brand,#006642)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 size-[26px]" data-node-id="65:1150" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-surface,white)] whitespace-nowrap" data-node-id="65:1151">
                2
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[286px]" data-node-id="65:1152" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] w-[286px]" data-node-id="65:1153">{`Đối chiếu hàng & mã nhận`}</p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="65:1154">
                15 hộp, nguyên vẹn, đúng đơn
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="65:1155" data-name="Frame">
            <div className="bg-[var(--sm-canvas,#f5f8f5)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 size-[26px]" data-node-id="65:1156" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="65:1157">
                3
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="65:1158" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[13px] w-[286px]" data-node-id="65:1159">
                Chờ tổ chức xác nhận
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[11px] w-[286px]" data-node-id="65:1160">
                Hoàn tất chuyến sau khi có xác nhận
              </p>
            </div>
          </div>
        </div>
        <button className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="65:1161" data-name="go/checkDelivered">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I65:1161;6:171">
            Kiểm tra xác nhận của tổ chức
          </p>
        </button>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="65:1163" data-name="go/scanDelivery">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I65:1163;6:173">
            Quét mã của người nhận
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[358px]" data-node-id="65:1165" data-name="go/incident">
          <div className="relative shrink-0 size-[24px]" data-node-id="65:1166" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[292px]" data-node-id="65:1168" data-name="Frame">
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[292px]" data-node-id="65:1169">
              Không liên lạc được người nhận
            </p>
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[292px]" data-node-id="65:1170">
              Báo điều phối để được hỗ trợ
            </p>
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="65:1171">
            ›
          </p>
        </a>
      </div>
    </div>
  );
}
