const imgProperty1ChartBar = "https://www.figma.com/api/mcp/asset/64b7223c-82ce-4089-a737-a89731643862.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/6725ed1d-8935-49b4-b231-34ba49f23f91.svg";
const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/ea3f9296-e3fa-4f22-b76e-9ee927270320.svg";
const imgNhMinhHaCommunity = "https://www.figma.com/api/mcp/asset/a76e34b1-b292-4b90-85c2-c4ba2a5b4ca4.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/c79d23e1-50bb-4e6c-828d-3194a64dca6d.svg";

type IconProps = {
  className?: string;
  property1?: "ChartBar" | "Box" | "ChervonLeft";
};

function Icon({ className, property1 = "ChartBar" }: IconProps) {
  const isBox = property1 === "Box";
  const isChervonLeft = property1 === "ChervonLeft";
  return (
    <div className={className || `relative ${isChervonLeft ? "size-[24px]" : isBox ? "overflow-clip size-[39px]" : "size-[37px]"}`} id={isChervonLeft ? "node-6_140" : isBox ? "node-6_109" : "node-6_98"}>
      {["ChartBar", "ChervonLeft"].includes(property1) && <img alt="" className="absolute block inset-0 max-w-none size-full" src={isChervonLeft ? imgProperty1ChervonLeft : imgProperty1ChartBar} />}
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

export default function U21LiCmnDaDcGi() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="65:1295" data-name="U21 · Lời cảm ơn đã được gửi">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="65:1296">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="65:1297">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="65:1298" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="ChervonLeft" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="65:1299" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="65:1300">
            Lời cảm ơn đã được gửi
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="65:1301">
            DN-367 · Gửi tới Bếp Nhà Lan
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="65:1304" data-name="Content">
        <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[24px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="65:1305" data-name="Frame">
          <div className="h-[170px] relative rounded-[16px] shrink-0 w-[310px]" data-node-id="73:1051" data-name="Ảnh minh họa / community">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaCommunity} />
          </div>
          <div className="relative shrink-0 size-[60px]" data-node-id="65:1306" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[26px] text-[color:var(--sm-ink,#173a30)] w-[310px]" data-node-id="65:1308">
            Một lời cảm ơn, thêm nhiều bữa ăn
          </p>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[310px]" data-node-id="65:1309">
            Bếp Nhà Lan đã nhận lời nhắn của Mái ấm Hoa Sen. Cảm ơn bạn đã cùng lan tỏa việc chia sẻ.
          </p>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="65:1310" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="65:1311">
            Tiếp tục quản lý thực phẩm
          </p>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="65:1312" data-name="go/U22">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="Box" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="65:1318" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="65:1319">
                Ghi nhận số suất đã phân phát
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="65:1320">
                Theo dõi tồn và hạn dùng sau khi nhận
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="65:1321">
              ›
            </p>
          </a>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="65:1322" data-name="go/charityReport">
            <Icon className="relative shrink-0 size-[24px]" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="65:1326" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="65:1327">
                Xem báo cáo tác động
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="65:1328">
                Chỉ tính số lượng đã xác nhận thực tế
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="65:1329">
              ›
            </p>
          </a>
        </div>
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="65:1330" data-name="go/orders">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I65:1330;6:171">
            Về đơn nhận
          </p>
        </a>
      </div>
    </div>
  );
}
