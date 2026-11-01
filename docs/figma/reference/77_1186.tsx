const imgProperty1Home = "https://www.figma.com/api/mcp/asset/f68ee3a7-b4a1-4f1f-849d-1324b035c7fe.svg";
const imgProperty1Notice = "https://www.figma.com/api/mcp/asset/210059c6-c172-4b94-8707-329934a58ce7.svg";
const imgEllipse = "https://www.figma.com/api/mcp/asset/0d7f9680-db17-4275-a458-d4cdcd5c2012.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/7d46dc65-ce9a-49af-b07f-a1fc9bda01c1.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/10ac2113-9129-45f4-af16-5b583a86c00c.svg";
const imgEllipse1 = "https://www.figma.com/api/mcp/asset/a7362926-d83d-4c4f-bbb7-2779f5e07fb3.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/6bc58ec7-0018-40ec-b8bb-948456abb6a2.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/d5dd9588-8c80-4f66-abd5-dfca2b546ef7.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/0df78a76-3747-48cf-95d5-6339bd874499.svg";
const imgGroup2 = "https://www.figma.com/api/mcp/asset/4745a715-ca03-420f-8624-8c1cf05a0542.svg";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/a8fa88cd-f1d0-402c-b70d-32d589cd89cf.svg";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/0b8910ac-2731-4052-bfc0-df3f8c2db412.svg";

type IconProps = {
  className?: string;
  property1?: "Home" | "Notice";
};

function Icon({ className, property1 = "Home" }: IconProps) {
  const isNotice = property1 === "Notice";
  return (
    <div className={className || `relative ${isNotice ? "size-[41px]" : "size-[43px]"}`} id={isNotice ? "node-6_101" : "node-6_90"}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={isNotice ? imgProperty1Notice : imgProperty1Home} />
    </div>
  );
}

export default function A14DaDiuPhiNgiThay() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="77:1186" data-name="A14 · Đã điều phối người thay">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="77:1187">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="77:1188">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="77:1189" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="77:1190" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="77:1191">
            Đã điều phối người thay
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="77:1192">
            CG-512 · Đã thông báo tới các bên
          </p>
        </div>
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="Notice" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[662px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="77:1195" data-name="Content">
        <div className="bg-[var(--sm-tint,#e3f2e9)] h-[250px] overflow-clip relative rounded-[var(--sm-radius-24,24px)] shrink-0 w-[358px]" data-node-id="77:1221" data-name="Frame">
          <div className="absolute flex h-[347.502px] items-center justify-center left-[138.98px] top-[-30px] w-[165.811px]" data-node-id="77:1222">
            <div className="flex-none rotate-16">
              <div className="bg-[var(--sm-blueBg,#e9f3f8)] h-[340px] relative w-[75px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[35px] w-[435.408px]" data-node-id="77:1223">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[102.803px] items-center justify-center left-[-20px] top-[-2.07px] w-[430.924px]" data-node-id="77:1224">
            <div className="-rotate-12 flex-none">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[143px] w-[435.408px]" data-node-id="77:1225">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[102.803px] items-center justify-center left-[-20px] top-[105.93px] w-[430.924px]" data-node-id="77:1226">
            <div className="-rotate-12 flex-none">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[251px] w-[435.408px]" data-node-id="77:1227">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute bg-[var(--sm-surface,white)] h-[310px] left-[40px] top-[-20px] w-[10px]" data-node-id="77:1228" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[310px] left-[124px] top-[-20px] w-[10px]" data-node-id="77:1229" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[310px] left-[208px] top-[-20px] w-[10px]" data-node-id="77:1230" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[310px] left-[292px] top-[-20px] w-[10px]" data-node-id="77:1231" data-name="Rectangle" />
          <div className="absolute left-[55px] size-[42px] top-[70px]" data-node-id="77:1232" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
          </div>
          <div className="absolute left-[65px] overflow-clip size-[22px] top-[80px]" data-node-id="77:1233" data-name="Icon">
            <div className="absolute inset-[9.54%_12.5%_8.33%_12.5%]" data-node-id="I77:1233;6:110" data-name="Group">
              <div className="absolute inset-[-5.53%_-6.06%_-4.07%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[1.4] left-[71px] not-italic text-[11px] text-[color:var(--sm-brand,#006642)] top-[49px] whitespace-nowrap" data-node-id="77:1238">
            A
          </p>
          <div className="absolute left-[245px] size-[42px] top-[170px]" data-node-id="77:1239" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
          </div>
          <div className="absolute left-[255px] size-[22px] top-[180px]" data-node-id="77:1240" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[1.4] left-[261px] not-italic text-[11px] text-[color:var(--sm-brand,#006642)] top-[149px] whitespace-nowrap" data-node-id="77:1242">
            B
          </p>
          <div className="absolute left-[160px] size-[42px] top-[120px]" data-node-id="77:1243" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse1} />
          </div>
          <div className="absolute left-[170px] size-[22px] top-[130px]" data-node-id="77:1244" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[22px] not-italic text-[11px] text-[color:var(--sm-muted,#687c74)] top-[18px] whitespace-nowrap" data-node-id="77:1246">
            Quận 1
          </p>
          <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[273px] not-italic text-[11px] text-[color:var(--sm-muted,#687c74)] top-[218px] whitespace-nowrap" data-node-id="77:1247">
            Quận 5
          </p>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="77:1248" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="77:1249">
            Minh Toàn đã được phân công
          </p>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="77:1250" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="77:1251">
              Cách điểm nhận chuyển giao
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="77:1252">
              600 m · khoảng 4 phút
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="77:1253" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="77:1254">
              Khối lượng bàn giao
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="77:1255">
              15 suất cơm gà
            </p>
          </div>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="77:1256" data-name="Frame">
            <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 size-[26px]" data-node-id="77:1257" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="77:1258">
                ✓
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[286px]" data-node-id="77:1259" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] w-[286px]" data-node-id="77:1260">
                Đã nhận yêu cầu hỗ trợ
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="77:1261">
                Lưu lý do hỏng xe của Quốc Bảo
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="77:1262" data-name="Frame">
            <div className="bg-[var(--sm-brand,#006642)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 size-[26px]" data-node-id="77:1263" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-surface,white)] whitespace-nowrap" data-node-id="77:1264">
                2
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[286px]" data-node-id="77:1265" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] w-[286px]" data-node-id="77:1266">
                Phân công người thay thế
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="77:1267">
                Minh Toàn nhận thông tin chuyến
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="77:1268" data-name="Frame">
            <div className="bg-[var(--sm-canvas,#f5f8f5)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 size-[26px]" data-node-id="77:1269" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="77:1270">
                3
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="77:1271" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[13px] w-[286px]" data-node-id="77:1272">
                Chờ xác nhận chuyển giao
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[11px] w-[286px]" data-node-id="77:1273">
                Hai tình nguyện viên đối chiếu hàng
              </p>
            </div>
          </div>
        </div>
        <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="77:1274" data-name="go/A04">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I77:1274;6:171">
            Quay lại bản đồ điều phối
          </p>
        </a>
      </div>
      <div className="absolute bg-[var(--sm-surface,white)] content-stretch cursor-pointer flex h-[72px] items-start left-0 pb-[8px] pt-[9px] top-[802px] w-[402px]" data-node-id="77:1196" data-name="SM/Admin navigation">
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1196;60:570" data-name="go/A01">
          <div className="relative shrink-0 size-[22px]" data-node-id="I77:1196;60:571" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1196;60:573">
            Tổng quan
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1196;60:574" data-name="go/A02">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I77:1196;60:575" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I77:1196;60:575;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1196;60:579">
            Hồ sơ
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1196;60:580" data-name="go/A04">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I77:1196;60:581" data-name="Icon">
            <div className="absolute inset-[12.5%_20.83%_13.56%_20.83%]" data-node-id="I77:1196;60:581;6:119" data-name="Group">
              <div className="absolute inset-[-6.15%_-7.79%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1196;60:585">
            Điều phối
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1196;60:586" data-name="go/A05">
          <div className="relative shrink-0 size-[22px]" data-node-id="I77:1196;60:587" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1196;60:589">
            Sự cố
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I77:1196;60:590" data-name="go/A06">
          <div className="relative shrink-0 size-[22px]" data-node-id="I77:1196;60:591" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon4} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I77:1196;60:593">
            Thêm
          </p>
        </a>
      </div>
    </div>
  );
}
