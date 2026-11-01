const imgGroup = "https://www.figma.com/api/mcp/asset/a86e5603-f484-45b9-80cd-bbf83f544113.svg";
const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/100ada7e-ff56-4dfc-bdfa-de6fc2ac187e.svg";
const imgNhMinhHaFood = "https://www.figma.com/api/mcp/asset/2bfa5f68-4f83-434e-9e4e-af538344e11b.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/3b3edec6-f9d7-48e1-a836-78ad5b3cc0d3.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/03cdfa37-acf0-4e3d-bbce-efe29b4e46ac.svg";

type IconProps = {
  className?: string;
  property1?: "ChervonLeft" | "Security";
};

function Icon({ className, property1 = "ChervonLeft" }: IconProps) {
  const isChervonLeft = property1 === "ChervonLeft";
  return (
    <div className={className || `relative ${isChervonLeft ? "size-[24px]" : "overflow-clip size-[34px]"}`} id={isChervonLeft ? "node-6_140" : "node-6_134"}>
      {property1 === "Security" && (
        <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="6:135" data-name="Group">
          <div className="absolute inset-[-3.44%_-3.92%]">
            <img alt="" className="block max-w-none size-full" src={imgGroup} />
          </div>
        </div>
      )}
      {isChervonLeft && <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgProperty1ChervonLeft} />}
    </div>
  );
}

export default function U11XacMinhNgiChoCaNhan() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="64:1314" data-name="U11 · Xác minh người cho cá nhân">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="64:1315">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="64:1316">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="64:1317" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="64:1318" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="64:1319">
            Xác minh người cho cá nhân
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="64:1320">
            Không yêu cầu giấy phép kinh doanh
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="64:1323" data-name="Content">
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:1324" data-name="Frame">
          <div className="h-[140px] relative rounded-[16px] shrink-0 w-[326px]" data-node-id="73:1047" data-name="Ảnh minh họa / food">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaFood} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="64:1325">{`Danh tính & địa chỉ`}</p>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:1326" data-name="Tài liệu đã đính kèm">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="Security" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[260px]" data-node-id="64:1331" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="64:1332">
                Giấy tờ tùy thân
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="64:1333">
                CCCD / giấy tờ còn hiệu lực
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] whitespace-nowrap" data-node-id="64:1334">
              ›
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="64:1335" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="64:1336">
              Họ và tên
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="64:1337">
              Nguyễn Minh Anh
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="64:1338" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="64:1339">
              Địa chỉ lấy thực phẩm
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="64:1340">
              45 Nguyễn Thị Minh Khai
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:1341" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="64:1342">
            Cam kết chia sẻ an toàn
          </p>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="64:1343">
            Chỉ chia sẻ thực phẩm chưa ăn dở, còn hạn, được đóng gói sạch và khai báo đầy đủ thành phần có thể gây dị ứng.
          </p>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:1344" data-name="Frame">
            <div className="relative shrink-0 size-[20px]" data-node-id="64:1345" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] whitespace-nowrap" data-node-id="64:1347">
              Tôi đã đọc và đồng ý cam kết
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-blueBg,#e9f3f8)] content-stretch flex gap-[10px] items-center overflow-clip p-[14px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:1348" data-name="Frame">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="64:1349" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I64:1349;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-blue,#2c6580)] w-[298px]" data-node-id="64:1353">
            Thông tin giấy tờ chỉ phục vụ xác minh, không hiển thị công khai.
          </p>
        </div>
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="64:1354" data-name="go/submitDonor">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I64:1354;6:171">
            Gửi hồ sơ cá nhân
          </p>
        </a>
      </div>
    </div>
  );
}
