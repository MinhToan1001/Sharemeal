const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/1d82c656-38c9-4c62-8ca4-95cf3605f9b5.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/fb0f9ac4-3444-4115-91b5-d8b3beac952b.svg";

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

export default function U07HSChaDcDuyt() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="64:1160" data-name="U07 · Hồ sơ chưa được duyệt">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="64:1161">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="64:1162">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="64:1163" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="64:1164" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="64:1165">
            Hồ sơ chưa được duyệt
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="64:1166">
            HS-0419 · Bạn có thể sửa và gửi lại
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="64:1169" data-name="Content">
        <div className="bg-[var(--sm-redBg,#fce9e7)] content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[24px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:1170" data-name="Frame">
          <div className="relative shrink-0 size-[44px]" data-node-id="64:1171" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[24px] text-[color:var(--sm-red,#b34343)] w-[310px]" data-node-id="64:1173">
            Cần xác thực lại thông tin
          </p>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[310px]" data-node-id="64:1174">
            Tên người đại diện trên hồ sơ chưa trùng với tài liệu đính kèm.
          </p>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:1175" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="64:1176">
            Cách hoàn thiện
          </p>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:1177" data-name="Frame">
            <div className="bg-[var(--sm-brand,#006642)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 size-[26px]" data-node-id="64:1178" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-surface,white)] whitespace-nowrap" data-node-id="64:1179">
                1
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[286px]" data-node-id="64:1180" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] w-[286px]" data-node-id="64:1181">
                Kiểm tra người đại diện
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="64:1182">
                Sửa lại họ tên đúng giấy tờ
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:1183" data-name="Frame">
            <div className="bg-[var(--sm-canvas,#f5f8f5)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 size-[26px]" data-node-id="64:1184" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="64:1185">
                2
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="64:1186" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[13px] w-[286px]" data-node-id="64:1187">
                Cập nhật tài liệu
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[11px] w-[286px]" data-node-id="64:1188">
                Tải bản còn hiệu lực, đủ các trang
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:1189" data-name="Frame">
            <div className="bg-[var(--sm-canvas,#f5f8f5)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 size-[26px]" data-node-id="64:1190" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="64:1191">
                3
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="64:1192" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[13px] w-[286px]" data-node-id="64:1193">
                Gửi xét duyệt lại
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[11px] w-[286px]" data-node-id="64:1194">
                Bạn vẫn có thể xem thực phẩm
              </p>
            </div>
          </div>
        </div>
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="64:1195" data-name="go/U01">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I64:1195;6:171">
            Chỉnh sửa hồ sơ
          </p>
        </a>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="64:1197" data-name="go/U10">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I64:1197;6:173">
            Yêu cầu hỗ trợ xem xét lại
          </p>
        </a>
      </div>
    </div>
  );
}
