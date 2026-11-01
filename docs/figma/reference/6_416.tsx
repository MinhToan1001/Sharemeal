const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/8fdb351e-b21c-4d46-86ed-6af6269152b4.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/c2274402-f5af-4faa-a7e0-13f7be8a2055.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/aae50bab-19be-4d5e-a8cc-ecfb54e3a760.svg";

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

export default function D03AnToanTrcKhiChiaS() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="6:416" data-name="D03 · An toàn trước khi chia sẻ">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="74:1157">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="74:1158">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="74:1159" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="74:1160" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="74:1161">
            An toàn trước khi chia sẻ
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="74:1162">{`Bước 2 / 3 · Thời gian, bảo quản & dị ứng`}</p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="74:1165" data-name="Content">
        <div className="bg-[var(--sm-amberBg,#fff0d7)] content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[20px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="74:1166" data-name="Frame">
          <div className="overflow-clip relative shrink-0 size-[38px]" data-node-id="74:1167" data-name="Icon">
            <div className="absolute inset-[8.33%]" data-node-id="I74:1167;6:143" data-name="Group">
              <div className="absolute inset-[-3.16%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[20px] text-[color:var(--sm-ink,#173a30)] w-[318px]" data-node-id="74:1171">
            Mới nấu 17:00 hôm nay
          </p>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-amber,#a35a09)] w-[318px]" data-node-id="74:1172">
            Dùng tốt nhất trước 23:00
          </p>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[318px]" data-node-id="74:1173">
            Đảm bảo đủ thời gian để lấy, giao và sử dụng.
          </p>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="74:1174" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="74:1175">
            Điều kiện bảo quản
          </p>
          <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="74:1176" data-name="Frame">
            <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[72px]" data-node-id="74:1177" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="74:1178">
                Còn nóng
              </p>
            </div>
            <div className="bg-[var(--sm-canvas,#f5f8f5)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[100px]" data-node-id="74:1179" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] whitespace-nowrap" data-node-id="74:1180">
                Để lạnh
              </p>
            </div>
            <div className="bg-[var(--sm-canvas,#f5f8f5)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[100px]" data-node-id="74:1181" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] whitespace-nowrap" data-node-id="74:1182">
                Khô ráo
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="74:1183" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="74:1184">
            Thành phần có thể gây dị ứng
          </p>
          <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="74:1185" data-name="Frame">
            <div className="bg-[var(--sm-amberBg,#fff0d7)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[90px]" data-node-id="74:1186" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-amber,#a35a09)] whitespace-nowrap" data-node-id="74:1187">
                Trứng
              </p>
            </div>
            <div className="bg-[var(--sm-canvas,#f5f8f5)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[110px]" data-node-id="74:1188" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] whitespace-nowrap" data-node-id="74:1189">
                Đậu phộng
              </p>
            </div>
            <div className="bg-[var(--sm-canvas,#f5f8f5)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[100px]" data-node-id="74:1190" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] whitespace-nowrap" data-node-id="74:1191">
                Hải sản
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="74:1192" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="74:1193">
            Kiểm tra món ăn
          </p>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="74:1194" data-name="Frame">
            <div className="relative shrink-0 size-[20px]" data-node-id="74:1195" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] whitespace-nowrap" data-node-id="74:1197">
              Chưa ăn dở hoặc bị chạm vào
            </p>
          </div>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="74:1198" data-name="Frame">
            <div className="relative shrink-0 size-[20px]" data-node-id="74:1199" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] whitespace-nowrap" data-node-id="74:1201">
              Đóng hộp sạch, có nắp
            </p>
          </div>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="74:1202" data-name="Frame">
            <div className="relative shrink-0 size-[20px]" data-node-id="74:1203" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] whitespace-nowrap" data-node-id="74:1205">
              Không có dấu hiệu hỏng
            </p>
          </div>
        </div>
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="74:1206" data-name="go/foodPickup">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I74:1206;6:171">{`Tiếp tục: Địa điểm & giờ lấy`}</p>
        </a>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="86:1176" data-name="go/packaging">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I86:1176;6:173">
            Xem hướng dẫn đóng gói
          </p>
        </a>
      </div>
    </div>
  );
}
