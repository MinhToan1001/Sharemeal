const imgProperty1Home = "https://www.figma.com/api/mcp/asset/fb809275-c29e-4c8a-9242-eb9c32753517.svg";
const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/f66c4dd9-39c6-4827-bd26-890af68f9971.svg";
const imgLine13 = "https://www.figma.com/api/mcp/asset/0167aa2c-3801-4b04-98b8-ee3e60d19ef4.svg";
const imgLine14 = "https://www.figma.com/api/mcp/asset/d63656cb-6345-4cc0-90ae-3783fea04620.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/bf171238-5648-4ef5-8db9-da4f459dcc85.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/a88f5350-a180-44dc-b471-e0a189938264.svg";
const imgLine15 = "https://www.figma.com/api/mcp/asset/dd93b7f2-90ca-4355-b851-a67d007459fc.svg";
const imgLine17 = "https://www.figma.com/api/mcp/asset/188adcf9-0616-4591-9f70-67d74196f89d.svg";
const imgFrame1 = "https://www.figma.com/api/mcp/asset/5f66a592-154a-4ab9-8aa4-9fb63326bf87.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/e1e6247e-8b7a-42ae-b407-053d113e4662.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/b533b62f-78d5-49c8-b2ad-ab17c14d2cd3.svg";

type IconProps = {
  className?: string;
  property1?: "Home" | "ChervonLeft";
};

function Icon({ className, property1 = "Home" }: IconProps) {
  const isChervonLeft = property1 === "ChervonLeft";
  return (
    <div className={className || `relative ${isChervonLeft ? "size-[24px]" : "size-[43px]"}`} id={isChervonLeft ? "node-6_140" : "node-6_90"}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={isChervonLeft ? imgProperty1ChervonLeft : imgProperty1Home} />
    </div>
  );
}

export default function Component19() {
  return (
    <div className="bg-[#f6f8f5] relative size-full" data-node-id="6:661" data-name="19">
      <div className="absolute bg-white content-stretch flex h-[56px] items-center justify-between left-0 overflow-clip px-[16px] py-[24px] top-0 w-[402px]" data-node-id="6:662">
        <div className="content-stretch flex gap-[27px] items-center relative shrink-0" data-node-id="6:663">
          <Icon className="relative shrink-0 size-[24px]" property1="ChervonLeft" />
          <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[0] not-italic relative shrink-0 w-[219px]" data-node-id="6:665">
            <div className="flex flex-col font-['Inter:Bold'] font-bold h-[23px] justify-center relative shrink-0 text-[20px] text-black w-full" data-node-id="6:666">
              <p className="leading-[normal]">Theo dõi bàn giao</p>
            </div>
            <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[12px] text-[color:var(--des-text,#919191)] w-full" data-node-id="6:667">
              <p className="leading-[normal]">Cơm gà xối mỡ · 15 suất</p>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-white border-[var(--color-6,#d9d9d9)] border-solid border-t-[1.5px] bottom-0 content-stretch flex h-[106px] items-end justify-center left-1/2 overflow-clip px-[16px] py-[24px] w-[402px]" data-node-id="6:668">
        <div className="bg-[#006642] content-stretch flex flex-[1_0_0] items-center justify-center min-w-px overflow-clip px-[16px] py-[19px] relative rounded-[12px]" data-node-id="6:669" data-name="Button">
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap" data-node-id="6:670">
            Hiện mã QR bàn giao
          </p>
        </div>
      </div>
      <div className="absolute bg-[#e4f1e8] h-[87px] left-[16px] overflow-clip top-[72px] w-[370px]" data-node-id="6:671">
        <div className="absolute flex h-[112px] items-center justify-center left-[167px] top-[-9px] w-[38.999px]" data-node-id="6:672">
          <div className="flex-none rotate-[109.2deg]">
            <div className="h-0 relative w-[118.596px]">
              <div className="absolute inset-[-12px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine13} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[44.007px] items-center justify-center left-[-136px] top-[16px] w-[575.009px]" data-node-id="6:673">
          <div className="flex-none rotate-[175.62deg]">
            <div className="h-0 relative w-[576.69px]">
              <div className="absolute inset-[-12px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine14} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bg-white content-stretch flex items-center justify-center left-[16px] overflow-clip px-[8px] py-[4px] rounded-[16px] top-[59px]" data-node-id="6:674">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-black whitespace-nowrap" data-node-id="6:675">
            <p className="leading-[normal]">Đến nơi sau khoảng 8 phút</p>
          </div>
        </div>
        <div className="absolute bg-[#006642] border-[0.5px] border-solid border-white left-[78px] overflow-clip rounded-[6px] size-[21px] top-[28px]" data-node-id="6:676">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] overflow-clip size-[12px] top-[calc(50%+0.5px)]" data-node-id="6:677" data-name="Icon">
            <div className="absolute inset-[12.5%_20.83%_13.56%_20.83%]" data-node-id="I6:677;6:119" data-name="Group">
              <div className="absolute inset-[-5.64%_-7.14%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bg-[#e69d00] border-[0.5px] border-solid border-white left-[268px] overflow-clip rounded-[6px] size-[21px] top-[13px]" data-node-id="6:678">
          <Icon className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] size-[12px] top-[calc(50%+0.5px)]" />
        </div>
      </div>
      <div className="absolute bg-white border-[1.5px] border-[var(--des-text,#919191)] border-solid h-[225px] left-[16px] overflow-clip rounded-[24px] top-[211px] w-[370px]" data-node-id="6:680">
        <div className="absolute content-stretch flex gap-[16px] h-[26px] items-center left-[16px] right-[16px] top-[24px]" data-node-id="6:681">
          <div className="bg-[#006642] overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-node-id="6:682">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[18px] top-1/2" data-node-id="6:683" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[0] not-italic relative shrink-0 text-[10px] w-[114px]" data-node-id="6:684">
            <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-black w-full" data-node-id="6:685">
              <p className="leading-[normal]">Đã ghép cặp</p>
            </div>
            <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[color:var(--des-text,#919191)] w-full" data-node-id="6:686">
              <p className="leading-[normal]">18:45 · Mái ấm Hoa Sen</p>
            </div>
          </div>
        </div>
        <div className="absolute content-stretch flex gap-[16px] h-[26px] items-center left-[16px] right-[16px] top-[62px]" data-node-id="6:687">
          <div className="bg-[#006642] overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-node-id="6:688">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[18px] top-1/2" data-node-id="6:689" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[0] not-italic relative shrink-0 text-[10px] w-[114px]" data-node-id="6:690">
            <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-black whitespace-nowrap" data-node-id="6:691">
              <p className="leading-[normal]">Tình nguyện viên đã nhận việc</p>
            </div>
            <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center min-w-full relative shrink-0 text-[color:var(--des-text,#919191)] w-[min-content]" data-node-id="6:692">
              <p className="leading-[normal]">18:52 · Trần Quốc Bảo</p>
            </div>
          </div>
        </div>
        <div className="absolute content-stretch flex gap-[16px] h-[24px] items-center left-[16px] right-[16px] top-[138px]" data-node-id="6:693">
          <div className="bg-[#cacaca] relative rounded-[100px] shrink-0 size-[24px]" data-node-id="6:694" />
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-[114px]" data-node-id="6:695">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[color:var(--des-text,#919191)] whitespace-nowrap" data-node-id="6:696">
              <p className="leading-[normal]">Đã lấy hàng</p>
            </div>
          </div>
        </div>
        <div className="absolute content-stretch flex gap-[16px] h-[24px] items-center left-[16px] right-[16px] top-[174px]" data-node-id="6:697">
          <div className="bg-[#cacaca] relative rounded-[100px] shrink-0 size-[24px]" data-node-id="6:698" />
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-[114px]" data-node-id="6:699">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[color:var(--des-text,#919191)] whitespace-nowrap" data-node-id="6:700">
              <p className="leading-[normal]">Đã bàn giao cho tổ chức</p>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[21px] items-center justify-center left-[26.5px] top-[46.5px] w-0" data-node-id="6:701">
          <div className="flex-none rotate-90">
            <div className="h-0 relative w-[21px]">
              <div className="absolute inset-[-3px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine15} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[21px] items-center justify-center left-[26.5px] top-[86.5px] w-0" data-node-id="6:702">
          <div className="flex-none rotate-90">
            <div className="h-0 relative w-[21px]">
              <div className="absolute inset-[-3px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine15} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[21px] items-center justify-center left-[26.5px] top-[120.5px] w-0" data-node-id="6:703">
          <div className="flex-none rotate-90">
            <div className="h-0 relative w-[21px]">
              <div className="absolute inset-[-3px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine17} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[21px] items-center justify-center left-[26.5px] top-[155.5px] w-0" data-node-id="6:704">
          <div className="flex-none rotate-90">
            <div className="h-0 relative w-[21px]">
              <div className="absolute inset-[-3px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine17} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute content-stretch flex gap-[16px] h-[26px] items-center left-[16px] right-[16px] top-[100px]" data-node-id="6:705">
          <div className="relative shrink-0 size-[24px]" data-node-id="6:706">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame1} />
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[0] not-italic relative shrink-0 text-[10px] w-[114px]" data-node-id="6:708">
            <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-black w-[166px]" data-node-id="6:709">
              <p className="leading-[normal]">Đã ghép cặp · đang tìm người giao</p>
            </div>
            <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center min-w-full relative shrink-0 text-[color:var(--des-text,#919191)] w-[min-content]" data-node-id="6:710">
              <p className="leading-[normal]">Dự kiến 19:05</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-white border border-[var(--des-text,#919191)] border-solid content-stretch flex items-center justify-between leading-[0] left-[16px] overflow-clip px-[16px] py-[12px] rounded-[12px] top-[452px] w-[370px]" data-node-id="6:711">
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="6:712">
          <div className="bg-[#e1fde8] col-1 ml-0 mt-0 overflow-clip relative rounded-[100px] row-1 size-[40px]" data-node-id="6:713">
            <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[calc(50%-7px)] not-italic text-[#006642] text-[18px] top-1/2 whitespace-nowrap" data-node-id="6:714">
              <p className="leading-[normal]">B</p>
            </div>
          </div>
          <div className="[word-break:break-word] col-1 content-stretch flex flex-col font-['Inter:Bold'] font-bold items-start ml-[50px] mt-[3px] not-italic relative row-1 w-[153px]" data-node-id="6:715">
            <div className="flex flex-col justify-center relative shrink-0 text-[16px] text-black w-full" data-node-id="6:716">
              <p className="leading-[normal]">Trần Quốc Bảo</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0 text-[12px] text-[color:var(--des-text,#919191)] w-full" data-node-id="6:717">
              <p className="leading-[normal]">Tình nguyện viên · 4,8 sao</p>
            </div>
          </div>
        </div>
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="6:718">
          <div className="border-[1.5px] border-[var(--des-text,#919191)] border-solid col-1 ml-0 mt-0 overflow-clip relative rounded-[100px] row-1 size-[40px]" data-node-id="6:719">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-node-id="6:720" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
            </div>
          </div>
          <div className="bg-[#1b6a4a] col-1 ml-[46px] mt-0 overflow-clip relative rounded-[100px] row-1 size-[40px]" data-node-id="6:721">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-node-id="6:722" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
            </div>
          </div>
        </div>
      </div>
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[57px] left-[11px] top-[767px] w-[380px]" data-node-id="84:1575" data-name="Prototype / Hiện mã QR bàn giao" />
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[52px] left-[6px] top-[8px] w-[46px]" data-node-id="84:1806" data-name="Prototype / Quay lại" />
    </div>
  );
}
