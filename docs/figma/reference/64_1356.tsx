const imgProperty1Love = "https://www.figma.com/api/mcp/asset/ee1332c0-9152-42de-85f0-db1275e24718.svg";
const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/42369ce6-a148-462c-ae0d-88e49eed6d8f.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/1e6e044d-f2b9-45ed-9cf1-79d9df1fc8cb.svg";
const imgEllipse = "https://www.figma.com/api/mcp/asset/e850c503-ce7f-4234-99da-6cb0f7de27d5.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/3ef2f8f7-d69d-4e2b-8256-ab1dfdbde971.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/8c00e513-74b6-4601-b8d2-e7314ab547d1.svg";
const imgEllipse1 = "https://www.figma.com/api/mcp/asset/740f1d8f-6632-4081-8040-6c0a24e1a26e.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/906c92da-caf3-4439-ba21-8df6d416cd9a.svg";

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

export default function U12XemThcPhmQuanhBn() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="64:1356" data-name="U12 · Xem thực phẩm quanh bạn">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="64:1357">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="64:1358">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="64:1359" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="ChervonLeft" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="64:1360" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="64:1361">
            Xem thực phẩm quanh bạn
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="64:1362">
            Chế độ xem · Hồ sơ đang được xét duyệt
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="64:1365" data-name="Content">
        <div className="bg-[var(--sm-blueBg,#e9f3f8)] content-stretch flex gap-[10px] items-center overflow-clip p-[14px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:1366" data-name="Frame">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="64:1367" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I64:1367;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-blue,#2c6580)] w-[298px]" data-node-id="64:1371">
            Bạn có thể xem thông tin. Đăng tin, đặt nhận và nhận chuyến sẽ mở sau khi xác minh.
          </p>
        </div>
        <div className="bg-[var(--sm-tint,#e3f2e9)] h-[250px] overflow-clip relative rounded-[var(--sm-radius-24,24px)] shrink-0 w-[358px]" data-node-id="64:1372" data-name="Frame">
          <div className="absolute flex h-[347.502px] items-center justify-center left-[138.98px] top-[-30px] w-[165.811px]" data-node-id="64:1373">
            <div className="flex-none rotate-16">
              <div className="bg-[var(--sm-blueBg,#e9f3f8)] h-[340px] relative w-[75px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[35px] w-[435.408px]" data-node-id="64:1374">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[102.803px] items-center justify-center left-[-20px] top-[-2.07px] w-[430.924px]" data-node-id="64:1375">
            <div className="-rotate-12 flex-none">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[143px] w-[435.408px]" data-node-id="64:1376">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[102.803px] items-center justify-center left-[-20px] top-[105.93px] w-[430.924px]" data-node-id="64:1377">
            <div className="-rotate-12 flex-none">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[251px] w-[435.408px]" data-node-id="64:1378">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute bg-[var(--sm-surface,white)] h-[310px] left-[40px] top-[-20px] w-[10px]" data-node-id="64:1379" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[310px] left-[124px] top-[-20px] w-[10px]" data-node-id="64:1380" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[310px] left-[208px] top-[-20px] w-[10px]" data-node-id="64:1381" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[310px] left-[292px] top-[-20px] w-[10px]" data-node-id="64:1382" data-name="Rectangle" />
          <div className="absolute left-[55px] size-[42px] top-[70px]" data-node-id="64:1383" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
          </div>
          <div className="absolute left-[65px] overflow-clip size-[22px] top-[80px]" data-node-id="64:1384" data-name="Icon">
            <div className="absolute inset-[9.54%_12.5%_8.33%_12.5%]" data-node-id="I64:1384;6:110" data-name="Group">
              <div className="absolute inset-[-5.53%_-6.06%_-4.07%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[1.4] left-[71px] not-italic text-[11px] text-[color:var(--sm-brand,#006642)] top-[49px] whitespace-nowrap" data-node-id="64:1389">
            A
          </p>
          <div className="absolute left-[245px] size-[42px] top-[170px]" data-node-id="64:1390" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
          </div>
          <div className="absolute left-[255px] size-[22px] top-[180px]" data-node-id="64:1391" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[1.4] left-[261px] not-italic text-[11px] text-[color:var(--sm-brand,#006642)] top-[149px] whitespace-nowrap" data-node-id="64:1393">
            B
          </p>
          <div className="absolute left-[160px] size-[42px] top-[120px]" data-node-id="64:1394" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse1} />
          </div>
          <div className="absolute left-[170px] size-[22px] top-[130px]" data-node-id="64:1395" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[22px] not-italic text-[11px] text-[color:var(--sm-muted,#687c74)] top-[18px] whitespace-nowrap" data-node-id="64:1397">
            Quận 1
          </p>
          <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[273px] not-italic text-[11px] text-[color:var(--sm-muted,#687c74)] top-[218px] whitespace-nowrap" data-node-id="64:1398">
            Quận 5
          </p>
        </div>
        <div className="[word-break:break-word] bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start leading-[1.4] not-italic overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:1399" data-name="Frame">
          <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="64:1400">
            Cơm gà xối mỡ · 20 suất
          </p>
          <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[326px]" data-node-id="64:1401">
            Bếp Nhà Lan · cách 1,2 km
          </p>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="64:1402" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="64:1403">
              Khung giờ lấy
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="64:1404">
              19:00–20:30
            </p>
          </div>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="64:1405" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="64:1406">
              Trạng thái
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="64:1407">
              Đang mở
            </p>
          </div>
        </div>
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="64:1408" data-name="go/U04">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I64:1408;6:171">
            Xem tiến trình xác minh
          </p>
        </a>
      </div>
    </div>
  );
}
