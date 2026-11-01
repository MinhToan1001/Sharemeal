const imgProperty1Love = "https://www.figma.com/api/mcp/asset/ab82927e-ee6e-4868-8efe-74969c108c92.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/03e18d61-afa0-4c3b-861a-db0a7d0f132d.svg";
const imgProperty1Truck = "https://www.figma.com/api/mcp/asset/b2e7f661-37c6-42c8-9caa-2c2f98c33025.svg";
const imgRectangle = "https://www.figma.com/api/mcp/asset/6295e89d-8a57-4549-ad71-c5bd755fa8f6.png";
const imgRectangle1 = "https://www.figma.com/api/mcp/asset/a9501148-da4c-4e8a-8cbb-37ba22af2e91.png";
const imgRectangle2 = "https://www.figma.com/api/mcp/asset/ca792a5a-9220-4797-b11e-62f8e69ff3df.png";

type IconProps = {
  className?: string;
  property1?: "Love" | "Box" | "Truck";
};

function Icon({ className, property1 = "Love" }: IconProps) {
  const isBox = property1 === "Box";
  const isTruck = property1 === "Truck";
  return (
    <div className={className || `relative ${isTruck ? "size-[39px]" : isBox ? "overflow-clip size-[39px]" : "size-[31px]"}`} id={isTruck ? "node-6_122" : isBox ? "node-6_109" : "node-6_107"}>
      {["Love", "Truck"].includes(property1) && <img alt="" className="absolute block inset-0 max-w-none size-full" src={isTruck ? imgProperty1Truck : imgProperty1Love} />}
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

export default function Component04ChnVaiTro() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="6:268" data-name="04 · Chọn vai trò">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="98:1297">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="98:1298">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex flex-col gap-[var(--sm-space-12,12px)] h-[806px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[48px] w-[358px]" data-node-id="98:1299" data-name="Content">
        <div className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[0] not-italic relative shrink-0 text-[28px] text-[color:var(--sm-ink,#173a30)] w-[358px]" data-node-id="98:1300">
          <p className="leading-[1.4] mb-0">Bạn muốn đóng góp</p>
          <p className="leading-[1.4]">theo cách nào?</p>
        </div>
        <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[13px] text-[color:var(--sm-muted,#687c74)] w-[358px]" data-node-id="98:1301">
          Bạn có thể thêm vai trò khác sau trong Hồ sơ.
        </p>
        <button className="bg-[var(--sm-tint,#e3f2e9)] content-stretch cursor-pointer flex gap-[12px] h-[138px] items-center overflow-clip p-[14px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="98:1302" data-name="Frame">
          <div className="content-stretch flex flex-col gap-[6px] items-start overflow-clip relative shrink-0 w-[190px]" data-node-id="98:1303" data-name="Frame">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="Box" />
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[17px] text-[color:var(--sm-ink,#173a30)] text-left w-[190px]" data-node-id="98:1309">
              Người cho
            </p>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] text-left w-[190px]" data-node-id="98:1310">
              Chia sẻ món ăn còn dùng được.
            </p>
          </div>
          <div className="relative rounded-[20px] shrink-0 size-[110px]" data-node-id="98:1311" data-name="Rectangle">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle} />
          </div>
        </button>
        <button className="bg-[var(--sm-amberBg,#fff0d7)] content-stretch cursor-pointer flex gap-[12px] h-[138px] items-center overflow-clip p-[14px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="98:1313" data-name="Frame">
          <div className="content-stretch flex flex-col gap-[6px] items-start overflow-clip relative shrink-0 w-[190px]" data-node-id="98:1314" data-name="Frame">
            <Icon className="relative shrink-0 size-[24px]" />
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[17px] text-[color:var(--sm-ink,#173a30)] text-left w-[190px]" data-node-id="98:1317">
              Tổ chức từ thiện
            </p>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] text-left w-[190px]" data-node-id="98:1318">
              Tiếp nhận thực phẩm cho cộng đồng.
            </p>
          </div>
          <div className="relative rounded-[20px] shrink-0 size-[110px]" data-node-id="98:1319" data-name="Rectangle">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle1} />
          </div>
        </button>
        <button className="bg-[var(--sm-blueBg,#e9f3f8)] content-stretch cursor-pointer flex gap-[12px] h-[138px] items-center overflow-clip p-[14px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="98:1321" data-name="Frame">
          <div className="content-stretch flex flex-col gap-[6px] items-start overflow-clip relative shrink-0 w-[190px]" data-node-id="98:1322" data-name="Frame">
            <Icon className="relative shrink-0 size-[24px]" property1="Truck" />
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[17px] text-[color:var(--sm-ink,#173a30)] text-left w-[190px]" data-node-id="98:1325">
              Tình nguyện viên
            </p>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] text-left w-[190px]" data-node-id="98:1326">
              Mang thực phẩm đến nơi cần.
            </p>
          </div>
          <div className="relative rounded-[20px] shrink-0 size-[110px]" data-node-id="98:1327" data-name="Rectangle">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle2} />
          </div>
        </button>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[13px] text-[color:var(--sm-brand,#006642)] w-[358px]" data-node-id="98:1329">
          Đang chọn: Người cho
        </p>
        <button className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="98:1330" data-name="auth/continueRole">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I98:1330;6:171">
            Tiếp tục với vai trò đã chọn
          </p>
        </button>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="98:1333" data-name="auth/login">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I98:1333;6:173">
            Quay lại đăng nhập
          </p>
        </a>
      </div>
    </div>
  );
}
