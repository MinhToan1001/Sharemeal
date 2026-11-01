const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/446a8f5c-d67b-49f0-a2f5-1d701ba7b45a.svg";
const imgNhMinhHaFood = "https://www.figma.com/api/mcp/asset/a4821c41-38e6-443c-8056-efa3ad65da47.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/4969fa27-db7c-4ca3-a164-ac087df471c1.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/bd73ae4a-4c8d-45c1-b0ee-fb1768b5d965.svg";

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

export default function U18DiSoatKhiNhnHang() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="65:1172" data-name="U18 · Đối soát khi nhận hàng">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="65:1173">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="65:1174">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="65:1175" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="65:1176" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="65:1177">
            Đối soát khi nhận hàng
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="65:1178">
            DN-367 · Ghi nhận đúng số lượng thực tế
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="65:1181" data-name="Content">
        <div className="[word-break:break-word] content-stretch flex gap-[12px] items-center leading-[1.4] not-italic overflow-clip relative shrink-0 w-[358px] whitespace-nowrap" data-node-id="65:1182" data-name="Frame">
          <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-4,4px)] h-[112px] items-start px-[var(--sm-space-16,16px)] py-[12px] relative rounded-bl-[16px] rounded-br-[16px] rounded-tl-[var(--sm-radius-16,16px)] rounded-tr-[16px] shrink-0 w-[169px]" data-node-id="65:1183" data-name="SM/Metric">
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)]" data-node-id="I65:1183;60:566">
              Theo đơn
            </p>
            <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[24px] text-[color:var(--sm-ink,#173a30)]" data-node-id="I65:1183;60:567">
              15 suất
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[10px] text-[color:var(--sm-brand,#006642)]" data-node-id="I65:1183;60:568">
              Số lượng đã được ghép
            </p>
          </div>
          <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-4,4px)] h-[112px] items-start px-[var(--sm-space-16,16px)] py-[12px] relative rounded-bl-[16px] rounded-br-[16px] rounded-tl-[var(--sm-radius-16,16px)] rounded-tr-[16px] shrink-0 w-[169px]" data-node-id="65:1187" data-name="SM/Metric">
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)]" data-node-id="I65:1187;60:566">
              Thực nhận tốt
            </p>
            <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[24px] text-[color:var(--sm-ink,#173a30)]" data-node-id="I65:1187;60:567">
              13 suất
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[10px] text-[color:var(--sm-brand,#006642)]" data-node-id="I65:1187;60:568">
              2 hộp bị đổ, tách riêng
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="65:1191" data-name="Frame">
          <div className="h-[130px] relative rounded-[16px] shrink-0 w-[326px]" data-node-id="73:1050" data-name="Ảnh minh họa / food">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaFood} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="65:1192">
            Tình trạng thực phẩm
          </p>
          <div className="bg-[var(--sm-redBg,#fce9e7)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[256px]" data-node-id="65:1193" data-name="Frame">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-red,#b34343)] whitespace-nowrap" data-node-id="65:1194">
              Thiếu / hỏng khi vận chuyển
            </p>
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="65:1195">
            Hai hộp bị đổ, không sử dụng. Mười ba hộp còn lại nguyên vẹn và đúng mô tả.
          </p>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="65:1196" data-name="go/U20">
            <div className="relative shrink-0 size-[24px]" data-node-id="65:1197" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="65:1199" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="65:1200">
                Ảnh bằng chứng bàn giao
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="65:1201">
                2 ảnh · chụp rõ phần bị ảnh hưởng
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="65:1202">
              ›
            </p>
          </a>
        </div>
        <div className="bg-[var(--sm-blueBg,#e9f3f8)] content-stretch flex gap-[10px] items-center overflow-clip p-[14px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="65:1203" data-name="Frame">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="65:1204" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I65:1204;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-blue,#2c6580)] w-[298px]" data-node-id="65:1208">
            Phần có vấn đề chưa được tính vào tác động. Admin sẽ đối chiếu với người cho và tình nguyện viên.
          </p>
        </div>
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="65:1209" data-name="go/openCase">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I65:1209;6:171">{`Gửi đối soát & nhận 13 suất`}</p>
        </a>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="65:1211" data-name="go/U16">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I65:1211;6:173">
            Quay lại kiểm tra
          </p>
        </a>
      </div>
    </div>
  );
}
