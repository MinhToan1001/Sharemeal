const imgTablerBackspace = "https://www.figma.com/api/mcp/asset/2e901fd3-a554-4f28-8f6b-a08f21a40e4d.svg";
const imgComponent4 = "https://www.figma.com/api/mcp/asset/00c6979c-1f2f-42f9-bfc6-1a11e8f71d2b.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/25c28103-fc9c-44d8-9779-c9dff345cea0.svg";
const imgLine8 = "https://www.figma.com/api/mcp/asset/846c0d1f-e5e0-4505-a4d1-4a867181d66e.svg";
const imgEllipse36 = "https://www.figma.com/api/mcp/asset/c2b061df-e12e-48ad-a649-ec06015eb31e.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/c15fcac6-d94a-433d-aed1-2a1d319c01b8.svg";
const imgFrame229 = "https://www.figma.com/api/mcp/asset/ac362fa6-75be-4706-b9ce-bad644dbb702.svg";

function TablerBackspace({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[24px]"} data-node-id="6:2993" data-name="tabler:backspace">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTablerBackspace} />
    </div>
  );
}

function Component4({ className }: { className?: string }) {
  return (
    <div className={className || "h-[19.51px] relative w-[21.512px]"} data-node-id="6:2972" data-name="Component 4">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgComponent4} />
    </div>
  );
}

function TablerLock({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[39px]"} data-node-id="6:2945" data-name="tabler:lock">
      <div className="absolute inset-[12.5%_20.83%]" data-node-id="6:2946" data-name="Group">
        <div className="absolute inset-[-3.42%_-4.4%]">
          <img alt="" className="block max-w-none size-full" src={imgGroup} />
        </div>
      </div>
    </div>
  );
}

export default function Component72() {
  return (
    <div className="bg-[#f6f8f5] relative size-full" data-node-id="6:2937" data-name="72">
      <div className="-translate-x-1/2 absolute bg-white border-[var(--color-6,#d9d9d9)] border-solid border-t-[1.5px] bottom-0 content-stretch flex flex-col h-[106px] items-center justify-end left-[calc(50%+1px)] overflow-clip px-[16px] py-[24px] w-[402px]" data-node-id="6:2938">
        <div className="bg-[#92c3b2] content-stretch flex items-center justify-center overflow-clip py-[19px] relative rounded-[20px] shrink-0 w-[332px]" data-node-id="6:2939" data-name="Button">
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap" data-node-id="I6:2939;6:171">
            Xác nhận bàn giao
          </p>
        </div>
      </div>
      <div className="absolute bg-white border border-[#919191] border-solid h-[81px] left-px overflow-clip top-0 w-[402px]" data-node-id="6:2940" data-name="31">
        <div className="absolute flex h-[14px] items-center justify-center left-[30px] top-[35px] w-[7.5px]" data-node-id="6:2941">
          <div className="flex-none rotate-90">
            <div className="h-[7.5px] relative w-[14px]">
              <div className="absolute inset-[-13.33%_-7.14%_-19.55%_-7.14%]">
                <img alt="" className="block max-w-none size-full" src={imgLine8} />
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[28px] justify-center leading-[0] left-[66px] not-italic text-[20px] text-black top-[37px] w-[232px]" data-node-id="6:2942">
          <p className="leading-[normal]">Xác nhận bằng mã PIN</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular'] font-normal h-[14px] justify-center leading-[0] left-[66px] not-italic text-[#717171] text-[12px] top-[56px] w-[232px]" data-node-id="6:2943">
          <p className="leading-[normal]">Dùng khi không quét được mã QR</p>
        </div>
      </div>
      <div className="absolute left-[166px] size-[72px] top-[107px]" data-node-id="6:2944">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse36} />
      </div>
      <TablerLock className="absolute left-[182px] size-[39px] top-[123px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold h-[25px] justify-center leading-[0] left-[202px] not-italic text-[20px] text-black text-center top-[212.5px] w-[172px]" data-node-id="6:2949">
        <p className="leading-[normal]">Nhập mã PIN 6 số</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular'] font-normal h-[37px] justify-center leading-[0] left-[201.5px] not-italic text-[#717171] text-[14px] text-center top-[249.5px] w-[371px]" data-node-id="6:2950">
        <p className="leading-[normal]">Nhờ bên đăng đọc mã PIN hiển thị trong mục Bàn giao của họ.</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular'] font-normal h-[18px] justify-center leading-[0] left-[213.5px] not-italic text-[#717171] text-[12px] text-center top-[384px] w-[241px]" data-node-id="6:2951">
        <p className="leading-[normal]">Mã có hiệu lực thêm 09:42 - còn 3 lần thử</p>
      </div>
      <div className="absolute left-[69px] size-[16px] top-[376px]" data-node-id="73:1112" data-name="tabler:clock">
        <div className="absolute inset-[12.5%]" data-node-id="73:1113" data-name="Group">
          <div className="absolute inset-[-8.33%]">
            <img alt="" className="block max-w-none size-full" src={imgGroup1} />
          </div>
        </div>
      </div>
      <div className="absolute bg-white border-2 border-[#006642] border-solid h-[65px] left-[28px] overflow-clip rounded-[15px] top-[291px] w-[52px]" data-node-id="6:2953">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[24px] justify-center leading-[0] left-[23.5px] not-italic text-[24px] text-black text-center top-[31px] w-[19px]" data-node-id="6:2954">
          <p className="leading-[normal]">4</p>
        </div>
      </div>
      <div className="absolute bg-white border-2 border-[#006642] border-solid h-[65px] left-[87px] overflow-clip rounded-[15px] top-[291px] w-[52px]" data-node-id="6:2955">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[24px] justify-center leading-[0] left-[23.5px] not-italic text-[24px] text-black text-center top-[31px] w-[19px]" data-node-id="6:2956">
          <p className="leading-[normal]">7</p>
        </div>
      </div>
      <div className="absolute bg-white border-2 border-[#006642] border-solid h-[65px] left-[146px] overflow-clip rounded-[15px] top-[291px] w-[52px]" data-node-id="6:2957">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[24px] justify-center leading-[0] left-[23.5px] not-italic text-[24px] text-black text-center top-[31px] w-[19px]" data-node-id="6:2958">
          <p className="leading-[normal]">2</p>
        </div>
      </div>
      <div className="absolute bg-white border-2 border-[#006642] border-solid h-[65px] left-[205px] overflow-clip rounded-[15px] top-[291px] w-[52px]" data-node-id="6:2959">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[24px] justify-center leading-[0] left-[23.5px] not-italic text-[24px] text-black text-center top-[31px] w-[19px]" data-node-id="6:2960">
          <p className="leading-[normal]">9</p>
        </div>
      </div>
      <div className="absolute h-[65px] left-[264px] top-[291px] w-[52px]" data-node-id="6:2961">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame229} />
      </div>
      <div className="absolute bg-white border-2 border-[#717171] border-solid h-[65px] left-[323px] rounded-[15px] top-[291px] w-[52px]" data-node-id="6:2963" />
      <div className="absolute bg-white border border-[#717171] border-solid h-[51px] left-[22px] overflow-clip rounded-[15px] top-[420px] w-[111px]" data-node-id="6:2964">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[55px] not-italic size-[20px] text-[20px] text-black text-center top-[25px]" data-node-id="6:2965">
          <p className="leading-[normal]">1</p>
        </div>
      </div>
      <div className="absolute bg-white border border-[#717171] border-solid h-[51px] left-[22px] overflow-clip rounded-[15px] top-[484px] w-[111px]" data-node-id="6:2966">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[55px] not-italic size-[20px] text-[20px] text-black text-center top-[25px]" data-node-id="6:2967">
          <p className="leading-[normal]">4</p>
        </div>
      </div>
      <div className="absolute bg-white border border-[#717171] border-solid h-[51px] left-[22px] overflow-clip rounded-[15px] top-[548px] w-[111px]" data-node-id="6:2968">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[55px] not-italic size-[20px] text-[20px] text-black text-center top-[25px]" data-node-id="6:2969">
          <p className="leading-[normal]">7</p>
        </div>
      </div>
      <div className="absolute h-[51px] left-[22px] overflow-clip rounded-[15px] top-[612px] w-[111px]" data-node-id="6:2970">
        <div className="absolute h-[19.5px] left-[44px] overflow-clip top-[16px] w-[23.5px]" data-node-id="6:2971">
          <Component4 className="absolute h-[19.51px] left-px top-[-0.01px] w-[21.512px]" />
        </div>
      </div>
      <div className="absolute bg-white border border-[#717171] border-solid h-[51px] left-[146px] overflow-clip rounded-[15px] top-[420px] w-[111px]" data-node-id="6:2978">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[55px] not-italic size-[20px] text-[20px] text-black text-center top-[25px]" data-node-id="6:2979">
          <p className="leading-[normal]">2</p>
        </div>
      </div>
      <div className="absolute bg-white border border-[#717171] border-solid h-[51px] left-[146px] overflow-clip rounded-[15px] top-[484px] w-[111px]" data-node-id="6:2980">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[55px] not-italic size-[20px] text-[20px] text-black text-center top-[25px]" data-node-id="6:2981">
          <p className="leading-[normal]">5</p>
        </div>
      </div>
      <div className="absolute bg-white border border-[#717171] border-solid h-[51px] left-[146px] overflow-clip rounded-[15px] top-[548px] w-[111px]" data-node-id="6:2982">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[55px] not-italic size-[20px] text-[20px] text-black text-center top-[25px]" data-node-id="6:2983">
          <p className="leading-[normal]">8</p>
        </div>
      </div>
      <div className="absolute bg-white border border-[#717171] border-solid h-[51px] left-[146px] overflow-clip rounded-[15px] top-[612px] w-[111px]" data-node-id="6:2984">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[55px] not-italic size-[20px] text-[20px] text-black text-center top-[25px]" data-node-id="6:2985">
          <p className="leading-[normal]">0</p>
        </div>
      </div>
      <div className="absolute bg-white border border-[#717171] border-solid h-[51px] left-[270px] overflow-clip rounded-[15px] top-[420px] w-[111px]" data-node-id="6:2986">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[55px] not-italic size-[20px] text-[20px] text-black text-center top-[25px]" data-node-id="6:2987">
          <p className="leading-[normal]">3</p>
        </div>
      </div>
      <div className="absolute bg-white border border-[#717171] border-solid h-[51px] left-[270px] overflow-clip rounded-[15px] top-[484px] w-[111px]" data-node-id="6:2988">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[55px] not-italic size-[20px] text-[20px] text-black text-center top-[25px]" data-node-id="6:2989">
          <p className="leading-[normal]">6</p>
        </div>
      </div>
      <div className="absolute bg-white border border-[#717171] border-solid h-[51px] left-[270px] overflow-clip rounded-[15px] top-[548px] w-[111px]" data-node-id="6:2990">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[55px] not-italic size-[20px] text-[20px] text-black text-center top-[25px]" data-node-id="6:2991">
          <p className="leading-[normal]">9</p>
        </div>
      </div>
      <div className="absolute h-[51px] left-[270px] overflow-clip rounded-[15px] top-[612px] w-[111px]" data-node-id="6:2992">
        <TablerBackspace className="absolute left-[44px] size-[24px] top-[14px]" />
      </div>
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[60px] left-[31px] top-[786px] w-[342px]" data-node-id="84:1652" data-name="Prototype / Xác nhận bàn giao" />
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[52px] left-[6px] top-[8px] w-[46px]" data-node-id="84:1860" data-name="Prototype / Quay lại" />
    </div>
  );
}
