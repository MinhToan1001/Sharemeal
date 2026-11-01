const imgGroup = "https://www.figma.com/api/mcp/asset/b1f685df-f53d-4561-ade2-7360e7300420.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/33d32b68-b7af-4998-97f2-c57955f5dd2f.svg";
const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/059248be-3101-463c-a32a-6204001dcb31.svg";
const imgNhMinhHaFood = "https://www.figma.com/api/mcp/asset/b1c4c3ab-9347-489d-b14f-2a78137ebd13.png";

type IconProps = {
  className?: string;
  property1?: "Box" | "MapPing" | "ChervonLeft";
};

function Icon({ className, property1 = "Box" }: IconProps) {
  const isChervonLeft = property1 === "ChervonLeft";
  const isMapPing = property1 === "MapPing";
  return (
    <div className={className || `relative ${isChervonLeft ? "size-[24px]" : isMapPing ? "overflow-clip size-[24px]" : "overflow-clip size-[39px]"}`} id={isChervonLeft ? "node-6_140" : isMapPing ? "node-6_118" : "node-6_109"}>
      {["Box", "MapPing"].includes(property1) && (
        <div className={`absolute ${isMapPing ? "inset-[12.5%_20.83%_13.56%_20.83%]" : "inset-[9.54%_12.5%_8.33%_12.5%]"}`} id={isMapPing ? "node-6_119" : "node-6_110"} data-name="Group">
          <div className={`absolute ${isMapPing ? "inset-[-5.64%_-7.14%]" : "inset-[-3.12%_-3.42%_-1.66%_-3.42%]"}`}>
            <img alt="" className="block max-w-none size-full" src={isMapPing ? imgGroup1 : imgGroup} />
          </div>
        </div>
      )}
      {isChervonLeft && <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgProperty1ChervonLeft} />}
    </div>
  );
}

export default function U22KhoPhanPhat() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="65:1332" data-name="U22 · Kho & phân phát">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="65:1333">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="65:1334">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="65:1335" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="ChervonLeft" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="65:1336" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="65:1337">{`Kho & phân phát`}</p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="65:1338">
            Cơ sở chính · Mái ấm Hoa Sen
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="65:1341" data-name="Content">
        <div className="[word-break:break-word] content-stretch flex gap-[12px] items-center leading-[1.4] not-italic overflow-clip relative shrink-0 w-[358px] whitespace-nowrap" data-node-id="65:1342" data-name="Frame">
          <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-4,4px)] h-[112px] items-start px-[var(--sm-space-16,16px)] py-[12px] relative rounded-bl-[16px] rounded-br-[16px] rounded-tl-[var(--sm-radius-16,16px)] rounded-tr-[16px] shrink-0 w-[169px]" data-node-id="65:1343" data-name="SM/Metric">
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)]" data-node-id="I65:1343;60:566">
              Còn trong kho
            </p>
            <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[24px] text-[color:var(--sm-ink,#173a30)]" data-node-id="I65:1343;60:567">
              15 suất
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[10px] text-[color:var(--sm-brand,#006642)]" data-node-id="I65:1343;60:568">
              Ưu tiên dùng trong hôm nay
            </p>
          </div>
          <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-4,4px)] h-[112px] items-start px-[var(--sm-space-16,16px)] py-[12px] relative rounded-bl-[16px] rounded-br-[16px] rounded-tl-[var(--sm-radius-16,16px)] rounded-tr-[16px] shrink-0 w-[169px]" data-node-id="65:1347" data-name="SM/Metric">
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)]" data-node-id="I65:1347;60:566">
              Đã phân phát
            </p>
            <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[24px] text-[color:var(--sm-ink,#173a30)]" data-node-id="I65:1347;60:567">
              32 suất
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[10px] text-[color:var(--sm-brand,#006642)]" data-node-id="I65:1347;60:568">
              Từ 3 đơn đã hoàn tất
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="65:1351" data-name="Frame">
          <div className="h-[150px] relative rounded-[16px] shrink-0 w-[326px]" data-node-id="73:1052" data-name="Ảnh minh họa / food">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaFood} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="65:1352">
            Ưu tiên dùng trước
          </p>
          <div className="bg-[var(--sm-amberBg,#fff0d7)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[230px]" data-node-id="65:1353" data-name="Frame">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-amber,#a35a09)] whitespace-nowrap" data-node-id="65:1354">
              Dùng tốt nhất trước 23:00
            </p>
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[19px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="65:1355">
            Cơm gà xối mỡ · 15 suất
          </p>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="65:1356" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="65:1357">
              Nguồn cung
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="65:1358">
              Bếp Nhà Lan · DN-367
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="65:1359" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="65:1360">
              Đã phát / còn lại
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="65:1361">
              0 / 15 suất
            </p>
          </div>
          <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[326px]" data-node-id="65:1362" data-name="go/U23">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I65:1362;6:171">
              Ghi nhận phân phát
            </p>
          </a>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="65:1364" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="65:1365">
            Lô khác đang có
          </p>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="65:1366" data-name="go/U23">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="65:1372" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="65:1373">
                Rau củ sơ chế · 6 kg
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="65:1374">
                Dùng trước ngày mai · bảo quản lạnh
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="65:1375">
              ›
            </p>
          </a>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="65:1376" data-name="go/warehouse">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="MapPing" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="65:1381" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="65:1382">{`Điểm nhận & sức chứa`}</p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="65:1383">
                2 địa điểm · cập nhật giờ hoạt động
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="65:1384">
              ›
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
