const imgProperty1Mess = "https://www.figma.com/api/mcp/asset/5ce9af13-1b45-452c-baa0-099c731cd577.svg";
const imgProperty1Truck = "https://www.figma.com/api/mcp/asset/6a7c735a-b423-4ec2-87e3-143804b9d042.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/23208420-df8f-48db-a60b-50075e9981a9.svg";
const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/3a569a1f-9e26-4094-a4a1-12c409d2b55d.svg";
const imgProperty1Warn = "https://www.figma.com/api/mcp/asset/1c8d2b8a-3227-4e71-99af-f88ea29cfa0c.svg";

type IconProps = {
  className?: string;
  property1?: "Mess" | "Truck" | "ChervonLeft" | "warn" | "Security";
};

function Icon({ className, property1 = "Mess" }: IconProps) {
  const isChervonLeft = property1 === "ChervonLeft";
  const isSecurity = property1 === "Security";
  const isTruck = property1 === "Truck";
  const isWarn = property1 === "warn";
  return (
    <div className={className || `relative ${["ChervonLeft", "warn"].includes(property1) ? "size-[24px]" : isSecurity ? "overflow-clip size-[34px]" : isTruck ? "size-[39px]" : "size-[43px]"}`} id={isWarn ? "node-6_146" : isChervonLeft ? "node-6_140" : isSecurity ? "node-6_134" : isTruck ? "node-6_122" : "node-6_114"}>
      {["Mess", "Truck", "ChervonLeft", "warn"].includes(property1) && <img alt="" className="absolute block inset-0 max-w-none size-full" src={isWarn ? imgProperty1Warn : isChervonLeft ? imgProperty1ChervonLeft : isTruck ? imgProperty1Truck : imgProperty1Mess} />}
      {isSecurity && (
        <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="6:135" data-name="Group">
          <div className="absolute inset-[-3.44%_-3.92%]">
            <img alt="" className="block max-w-none size-full" src={imgGroup} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function U10TrungTamHTr() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="64:1264" data-name="U10 · Trung tâm hỗ trợ">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="64:1265">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="64:1266">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="64:1267" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="ChervonLeft" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="64:1268" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="64:1269">
            Trung tâm hỗ trợ
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="64:1270">
            Chọn đúng vấn đề để được hỗ trợ nhanh hơn
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="64:1273" data-name="Content">
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:1274" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="64:1275">
            Bạn cần hỗ trợ về điều gì?
          </p>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:1276" data-name="go/U06">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="Security" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="64:1281" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="64:1282">{`Tài khoản & xác minh`}</p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="64:1283">
                Hồ sơ chờ duyệt, giấy tờ, quyền sử dụng
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="64:1284">
              ›
            </p>
          </a>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="64:1285" data-name="Rectangle" />
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:1286" data-name="go/U20">
            <Icon className="relative shrink-0 size-[24px]" property1="Truck" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="64:1289" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="64:1290">{`Giao nhận & số lượng`}</p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="64:1291">
                Thiếu hàng, giao trễ hoặc không liên lạc được
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="64:1292">
              ›
            </p>
          </a>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="64:1293" data-name="Rectangle" />
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:1294" data-name="go/U20">
            <Icon className="relative shrink-0 size-[24px]" property1="warn" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="64:1297" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="64:1298">
                An toàn thực phẩm
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="64:1299">
                Không dùng phần có dấu hiệu không đảm bảo
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="64:1300">
              ›
            </p>
          </a>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:1301" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="64:1302">
            Yêu cầu của bạn
          </p>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:1303" data-name="go/U19">
            <Icon className="relative shrink-0 size-[24px]" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="64:1306" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="64:1307">
                KN-3307 · Đang xử lý
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="64:1308">
                Đối soát số lượng đơn DN-367
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="64:1309">
              ›
            </p>
          </a>
        </div>
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="64:1310" data-name="go/U20">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I64:1310;6:171">
            Tạo yêu cầu hỗ trợ
          </p>
        </a>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="64:1312" data-name="go/chat">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I64:1312;6:173">
            Nhắn tin với người liên quan
          </p>
        </a>
      </div>
    </div>
  );
}
