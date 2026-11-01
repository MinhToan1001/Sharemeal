const imgComponent1 = "https://www.figma.com/api/mcp/asset/92bf51d9-3dc7-44ae-a087-260d1f7e25a9.svg";
const imgLine8 = "https://www.figma.com/api/mcp/asset/344b64bb-2366-407c-8280-efb2410be3c1.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/be03875c-4f58-49d0-9f94-5ec36c282be5.svg";
const imgLine49 = "https://www.figma.com/api/mcp/asset/f39d1840-c464-4fd9-b858-88cda3011566.svg";

function Component1({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[46px]"} data-node-id="6:1444" data-name="Component 1">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent1} />
    </div>
  );
}

export default function Component32() {
  return (
    <div className="bg-[#f6f8f5] relative size-full" data-node-id="6:1614" data-name="32">
      <div className="absolute bg-white border border-[#919191] border-solid h-[81px] left-0 overflow-clip top-px w-[402px]" data-node-id="6:1615" data-name="44">
        <div className="absolute flex h-[14px] items-center justify-center left-[30px] top-[35px] w-[7.5px]" data-node-id="6:1616">
          <div className="flex-none rotate-90">
            <div className="h-[7.5px] relative w-[14px]">
              <div className="absolute inset-[-13.33%_-7.14%_-19.55%_-7.14%]">
                <img alt="" className="block max-w-none size-full" src={imgLine8} />
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[28px] justify-center leading-[0] left-[65px] not-italic text-[20px] text-black top-[42px] w-[214px]" data-node-id="6:1617">
          <p className="leading-[normal]">{`Điểm nhận & kho`}</p>
        </div>
        <Component1 className="absolute left-[344px] size-[46px] top-[19px]" />
      </div>
      <div className="absolute bg-white border border-[#717171] border-solid h-[176px] left-[22px] overflow-clip rounded-[15px] top-[101px] w-[359px]" data-node-id="6:1619">
        <div className="absolute bg-[#e4f1e8] h-[46px] left-[16px] overflow-clip rounded-[15px] top-[15px] w-[45px]" data-node-id="6:1620">
          <div className="absolute left-[11px] size-[23px] top-[11px]" data-node-id="73:1124" data-name="tabler:map-pin">
            <div className="absolute inset-[12.5%_16.67%_10.48%_16.67%]" data-node-id="73:1125" data-name="Group">
              <div className="absolute inset-[-5.65%_-6.52%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bg-[#e1fde8] content-stretch flex items-center justify-center left-[263px] overflow-clip px-[12px] py-[3px] rounded-[11px] top-[15px]" data-node-id="6:1622" data-name="Tag">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1b6a4a] text-[12px] whitespace-nowrap" data-node-id="I6:1622;6:180">
            <p className="leading-[normal]">Mặc định</p>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[19px] justify-center leading-[0] left-[73px] not-italic text-[16px] text-black top-[23.5px] w-[174px]" data-node-id="6:1623">
          <p className="leading-[normal]">Cơ sở chính - Quận 5</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[17px] justify-center leading-[0] left-[73px] not-italic text-[12px] text-black top-[42.5px] w-[145px]" data-node-id="6:1624">
          <p className="leading-[normal]">12 Lê Hồng Phong, Q.5</p>
        </div>
        <div className="[word-break:break-word] absolute bg-[#f2f2f2] font-['Inter:Medium'] font-medium h-[54px] leading-[0] left-[16px] not-italic overflow-clip rounded-[15px] text-black top-[72px] w-[159px]" data-node-id="6:1625">
          <div className="-translate-y-1/2 absolute flex flex-col h-[13px] justify-center left-[13px] text-[12px] top-[17.5px] w-[58px]" data-node-id="6:1626">
            <p className="leading-[normal]">Giờ nhận</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col h-[17px] justify-center left-[13px] text-[15px] top-[35.5px] w-[113px]" data-node-id="6:1627">
            <p className="leading-[normal]">16:00 - 21:00</p>
          </div>
        </div>
        <div className="[word-break:break-word] absolute bg-[#f2f2f2] font-['Inter:Medium'] font-medium h-[54px] leading-[0] left-[183px] not-italic overflow-clip rounded-[15px] text-black top-[72px] w-[159px]" data-node-id="6:1628">
          <div className="-translate-y-1/2 absolute flex flex-col h-[13px] justify-center left-[13px] text-[12px] top-[17.5px] w-[58px]" data-node-id="6:1629">
            <p className="leading-[normal]">Sức chứa</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col h-[17px] justify-center left-[13px] text-[15px] top-[35.5px] w-[113px]" data-node-id="6:1630">
            <p className="leading-[normal]">80 suất / ngày</p>
          </div>
        </div>
        <div className="absolute bg-[#e4eef8] content-stretch flex items-center justify-center left-[16px] overflow-clip px-[12px] py-[3px] rounded-[11px] top-[137px] w-[83px]" data-node-id="6:1631" data-name="Tag">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0c4da2] text-[12px] whitespace-nowrap" data-node-id="I6:1631;6:182">
            <p className="leading-[normal]">Có tủ lạnh</p>
          </div>
        </div>
        <div className="absolute bg-[#f4f5f3] content-stretch flex items-center justify-center left-[108px] overflow-clip px-[12px] py-[3px] rounded-[11px] top-[137px] w-[124px]" data-node-id="6:1632" data-name="Tag">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[color:var(--color-5,#979a9e)] whitespace-nowrap" data-node-id="I6:1632;6:182">
            <p className="leading-[normal]">Có bếp hâm nóng</p>
          </div>
        </div>
      </div>
      <div className="absolute bg-white border border-[#717171] border-solid h-[147px] left-[22px] overflow-clip rounded-[15px] top-[296px] w-[359px]" data-node-id="6:1633">
        <div className="absolute bg-[#e4f1e8] h-[46px] left-[16px] overflow-clip rounded-[15px] top-[15px] w-[45px]" data-node-id="6:1634">
          <div className="absolute left-[11px] size-[23px] top-[11px]" data-node-id="73:1120" data-name="tabler:map-pin">
            <div className="absolute inset-[12.5%_16.67%_10.48%_16.67%]" data-node-id="73:1121" data-name="Group">
              <div className="absolute inset-[-5.65%_-6.52%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[19px] justify-center leading-[0] left-[73px] not-italic text-[16px] text-black top-[23.5px] w-[190px]" data-node-id="6:1636">
          <p className="leading-[normal]">Điểm phát cơm - Quận 8</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[17px] justify-center leading-[0] left-[73px] not-italic text-[12px] text-black top-[42.5px] w-[145px]" data-node-id="6:1637">
          <p className="leading-[normal]">88 Phạm Hùng, Q8</p>
        </div>
        <div className="[word-break:break-word] absolute bg-[#f2f2f2] font-['Inter:Medium'] font-medium h-[54px] leading-[0] left-[16px] not-italic overflow-clip rounded-[15px] text-black top-[72px] w-[159px]" data-node-id="6:1638">
          <div className="-translate-y-1/2 absolute flex flex-col h-[13px] justify-center left-[13px] text-[12px] top-[17.5px] w-[58px]" data-node-id="6:1639">
            <p className="leading-[normal]">Giờ nhận</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col h-[17px] justify-center left-[13px] text-[15px] top-[35.5px] w-[113px]" data-node-id="6:1640">
            <p className="leading-[normal]">17:00 - 20:00</p>
          </div>
        </div>
        <div className="[word-break:break-word] absolute bg-[#f2f2f2] font-['Inter:Medium'] font-medium h-[54px] leading-[0] left-[183px] not-italic overflow-clip rounded-[15px] text-black top-[72px] w-[159px]" data-node-id="6:1641">
          <div className="-translate-y-1/2 absolute flex flex-col h-[13px] justify-center left-[13px] text-[12px] top-[17.5px] w-[58px]" data-node-id="6:1642">
            <p className="leading-[normal]">Sức chứa</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col h-[17px] justify-center left-[13px] text-[15px] top-[35.5px] w-[113px]" data-node-id="6:1643">
            <p className="leading-[normal]">40 suất / ngày</p>
          </div>
        </div>
      </div>
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[24px] justify-center leading-[0] left-[22px] not-italic text-[15px] text-black top-[469px] w-[136px]" data-node-id="6:1644">
        <p className="leading-[normal]">Tồn kho hôm nay</p>
      </div>
      <div className="absolute bg-white border border-[#717171] border-solid h-[143px] left-[22px] overflow-clip rounded-[20px] top-[493px] w-[359px]" data-node-id="6:1645">
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[22px] justify-center leading-[0] left-[16px] not-italic text-[15px] text-black top-[26px] w-[119px]" data-node-id="6:1646">
          <p className="leading-[normal]">{`Cơm & món mặn`}</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[22px] justify-center leading-[0] left-[16px] not-italic text-[15px] text-black top-[71px] w-[119px]" data-node-id="6:1647">
          <p className="leading-[normal]">Rau củ</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[22px] justify-center leading-[0] left-[16px] not-italic text-[15px] text-black top-[116px] w-[146px]" data-node-id="6:1648">
          <p className="leading-[normal]">{`Bánh & tráng miệng`}</p>
        </div>
        <div className="-translate-x-full -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[22px] justify-center leading-[0] left-[341px] not-italic text-[14px] text-black text-right top-[26px] w-[170px]" data-node-id="6:1649">
          <p className="leading-[normal]">Đã nhận 15 - đã phát 0</p>
        </div>
        <div className="-translate-x-full -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[22px] justify-center leading-[0] left-[341px] not-italic text-[14px] text-black text-right top-[71px] w-[170px]" data-node-id="6:1650">
          <p className="leading-[normal]">Đã nhận 6 kg</p>
        </div>
        <div className="-translate-x-full -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium'] font-medium h-[22px] justify-center leading-[0] left-[341px] not-italic text-[14px] text-black text-right top-[114px] w-[170px]" data-node-id="6:1651">
          <p className="leading-[normal]">Đã nhận 0</p>
        </div>
        <div className="absolute flex h-px items-center justify-center left-[19px] top-[49px] w-[321px]" data-node-id="6:1652">
          <div className="flex-none rotate-[0.18deg]">
            <div className="h-0 relative w-[321.002px]">
              <div className="absolute inset-[-2px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine49} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-px items-center justify-center left-[19px] top-[93px] w-[321px]" data-node-id="6:1653">
          <div className="flex-none rotate-[0.18deg]">
            <div className="h-0 relative w-[321.002px]">
              <div className="absolute inset-[-2px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine49} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[244px] left-[22px] top-[90px] w-[358px]" data-node-id="84:1692" data-name="Prototype / Mở kho thực phẩm" />
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[52px] left-[6px] top-[8px] w-[46px]" data-node-id="84:1820" data-name="Prototype / Quay lại" />
    </div>
  );
}
