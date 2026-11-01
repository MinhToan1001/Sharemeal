const imgProperty1Love = "https://www.figma.com/api/mcp/asset/447ff475-96a6-403f-8a8f-f2aa366c5c87.svg";
const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/4c16c2ae-ae38-4174-bd4f-a9746c2ffdbb.svg";
const imgNhMinhHaCommunity = "https://www.figma.com/api/mcp/asset/3239506a-0015-4c3d-8dbd-3453e66091cf.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/ce62c766-b86b-4bd6-9f54-c0eda22e0ce4.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/d5faf056-ca6b-44cb-b1aa-21997d8c31dd.svg";

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

export default function U23GhiNhnPhanPhat() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="65:1385" data-name="U23 · Ghi nhận phân phát">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="65:1386">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="65:1387">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="65:1388" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="ChervonLeft" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="65:1389" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="65:1390">
            Ghi nhận phân phát
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="65:1391">
            Lô SM-2041 · Cơm gà xối mỡ
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="65:1394" data-name="Content">
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="65:1395" data-name="Frame">
          <div className="h-[130px] relative rounded-[16px] shrink-0 w-[326px]" data-node-id="73:1053" data-name="Ảnh minh họa / community">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaCommunity} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="65:1396">
            Phân bổ bữa ăn
          </p>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="65:1397" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="65:1398">
              Có thể phân phát
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="65:1399">
              15 suất
            </p>
          </div>
          <div className="bg-[var(--sm-canvas,#f5f8f5)] content-stretch flex gap-[12px] items-center overflow-clip p-[12px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[326px]" data-node-id="65:1400" data-name="Frame">
            <div className="relative shrink-0 size-[22px]" data-node-id="65:1401" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] w-[170px]" data-node-id="65:1403">
              Trẻ em
            </p>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="65:1404">
              10 suất
            </p>
          </div>
          <div className="bg-[var(--sm-canvas,#f5f8f5)] content-stretch flex gap-[12px] items-center overflow-clip p-[12px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[326px]" data-node-id="65:1405" data-name="Frame">
            <div className="relative shrink-0 size-[22px]" data-node-id="65:1406" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] w-[170px]" data-node-id="65:1408">
              Người cao tuổi
            </p>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="65:1409">
              5 suất
            </p>
          </div>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="65:1410" data-name="Rectangle" />
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="65:1411" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="65:1412">
              Tổng phân phát
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="65:1413">
              15 / 15 suất
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="65:1414" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="65:1415">
              Tồn sau ghi nhận
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="65:1416">
              0 suất
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-blueBg,#e9f3f8)] content-stretch flex gap-[10px] items-center overflow-clip p-[14px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="65:1417" data-name="Frame">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="65:1418" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I65:1418;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-blue,#2c6580)] w-[298px]" data-node-id="65:1422">
            Chỉ ghi nhận số lượng theo nhóm. Không lưu tên hoặc thông tin cá nhân người được hỗ trợ.
          </p>
        </div>
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="65:1423" data-name="go/distribute">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I65:1423;6:171">
            Xác nhận đã phân phát
          </p>
        </a>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="65:1425" data-name="go/U22">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I65:1425;6:173">
            Quay lại kho
          </p>
        </a>
      </div>
    </div>
  );
}
