const imgRectangle1 = "https://www.figma.com/api/mcp/asset/7738e06c-9a10-42d8-b2ee-0416d40ee61e.png";

export default function Component1() {
  return (
    <div className="bg-[#006642] relative size-full" data-node-id="6:220" data-name="1">
      <div className="absolute h-[287px] left-0 overflow-clip top-[159px] w-[402px]" data-node-id="6:221">
        <div className="absolute h-[120px] left-[137px] rounded-[20px] top-[16px] w-[128px]" data-node-id="6:222">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle1} />
        </div>
        <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold h-[54px] leading-[normal] left-[99px] not-italic text-[40px] text-white top-[150px] w-[218px]" data-node-id="6:223">
          ShareMeal
        </p>
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium'] font-medium h-[76px] leading-[normal] left-[208px] not-italic text-[16px] text-center text-white top-[218px] w-[254px]" data-node-id="6:224">{`Chia bữa ăn còn dùng được, sưởi ấm bữa cơm của người cần `}</p>
      </div>
      <div className="absolute h-[64px] left-0 overflow-clip top-[761px] w-[402px]" data-node-id="6:225">
        <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium h-[28px] leading-[normal] left-[88px] not-italic text-[16px] text-white top-[32px] w-[244px]" data-node-id="6:226">
          Góp phần vào mục tiêu xóa đói
        </p>
        <div className="absolute flex h-[5px] items-center justify-center left-[213px] top-[19px] w-[74px]" data-node-id="6:227">
          <div className="flex-none rotate-180">
            <div className="bg-[#01a76d] h-[5px] relative rounded-bl-[20px] rounded-tl-[20px] w-[74px]" />
          </div>
        </div>
        <div className="absolute bg-[#e69d00] h-[5px] left-[143px] rounded-bl-[20px] rounded-br-[5px] rounded-tl-[20px] rounded-tr-[5px] top-[19px] w-[74px]" data-node-id="6:228" />
      </div>
    </div>
  );
}
