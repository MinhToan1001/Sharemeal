const imgProperty1Home = "https://www.figma.com/api/mcp/asset/258d1212-cecf-4a2f-9a4f-413c9c37eed6.svg";
const imgProperty1Notice = "https://www.figma.com/api/mcp/asset/9290a1fd-2a04-4cf9-b7ce-8f085f549f21.svg";
const imgProperty1Truck = "https://www.figma.com/api/mcp/asset/73f33de6-3cfb-47f4-8178-8f497e7efecb.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/dcf71ebb-7d0b-49ae-945e-f84dec87e8e3.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/cab8c9ed-930d-438c-8aac-d27f958d28b7.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/f7d59655-01af-4480-abe2-741c7e34413f.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/e38c6c6d-e818-4ed9-94e7-f72b859ffdb9.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/278b94d2-7f85-46a5-b722-a9024e700131.svg";

type IconProps = {
  className?: string;
  property1?: "Home" | "Notice" | "Truck";
};

function Icon({ className, property1 = "Home" }: IconProps) {
  const isNotice = property1 === "Notice";
  const isTruck = property1 === "Truck";
  return (
    <div className={className || `relative ${isTruck ? "size-[39px]" : isNotice ? "size-[41px]" : "size-[43px]"}`} id={isTruck ? "node-6_122" : isNotice ? "node-6_101" : "node-6_90"}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={isTruck ? imgProperty1Truck : isNotice ? imgProperty1Notice : imgProperty1Home} />
    </div>
  );
}

export default function A07BaoCaoVnHanh() {
  return (
    <div className="bg-[var(--sm-blueBg,#e9f3f8)] relative size-full" data-node-id="62:1239" data-name="A07 · Báo cáo vận hành">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="62:1240">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="62:1241">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="62:1242" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="62:1243" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="62:1244">
            Báo cáo vận hành
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="62:1245">
            22–29/10/2026 · TP. Hồ Chí Minh
          </p>
        </div>
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="Notice" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[662px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="62:1248" data-name="Content">
        <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-[358px]" data-node-id="62:1274" data-name="Frame">
          <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[72px]" data-node-id="62:1275" data-name="Frame">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="62:1276">
              Tuần này
            </p>
          </div>
          <div className="bg-[var(--sm-surface,white)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[90px]" data-node-id="62:1277" data-name="Frame">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] whitespace-nowrap" data-node-id="62:1278">
              Tháng
            </p>
          </div>
          <div className="bg-[var(--sm-surface,white)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[128px]" data-node-id="62:1279" data-name="Frame">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] whitespace-nowrap" data-node-id="62:1280">
              Theo khu vực
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:1281" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="62:1282">
            16.842 suất ăn đã đến nơi
          </p>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[326px]" data-node-id="62:1283">
            Tăng 18,6% so với tuần trước
          </p>
          <div className="h-[145px] overflow-clip relative shrink-0 w-[326px]" data-node-id="62:1284" data-name="Frame">
            <div className="absolute bg-[var(--sm-tint,#e3f2e9)] h-[60.483px] left-[8px] rounded-[5px] top-[60.52px] w-[26px]" data-node-id="62:1285" data-name="Rectangle" />
            <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[13px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[128px] whitespace-nowrap" data-node-id="62:1286">
              T2
            </p>
            <div className="absolute bg-[var(--sm-tint,#e3f2e9)] h-[79.322px] left-[54.57px] rounded-[5px] top-[41.68px] w-[26px]" data-node-id="62:1287" data-name="Rectangle" />
            <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[59.57px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[128px] whitespace-nowrap" data-node-id="62:1288">
              T3
            </p>
            <div className="absolute bg-[var(--sm-tint,#e3f2e9)] h-[68.415px] left-[101.14px] rounded-[5px] top-[52.58px] w-[26px]" data-node-id="62:1289" data-name="Rectangle" />
            <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[106.14px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[128px] whitespace-nowrap" data-node-id="62:1290">
              T4
            </p>
            <div className="absolute bg-[var(--sm-tint,#e3f2e9)] h-[91.22px] left-[147.71px] rounded-[5px] top-[29.78px] w-[26px]" data-node-id="62:1291" data-name="Rectangle" />
            <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[152.71px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[128px] whitespace-nowrap" data-node-id="62:1292">
              T5
            </p>
            <div className="absolute bg-[var(--sm-tint,#e3f2e9)] h-[84.28px] left-[194.29px] rounded-[5px] top-[36.72px] w-[26px]" data-node-id="62:1293" data-name="Rectangle" />
            <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[199.29px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[128px] whitespace-nowrap" data-node-id="62:1294">
              T6
            </p>
            <div className="absolute bg-[var(--sm-tint,#e3f2e9)] h-[100.144px] left-[240.86px] rounded-[5px] top-[20.86px] w-[26px]" data-node-id="62:1295" data-name="Rectangle" />
            <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[245.86px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[128px] whitespace-nowrap" data-node-id="62:1296">
              T7
            </p>
            <div className="absolute bg-[var(--sm-brand,#006642)] h-[117px] left-[287.43px] rounded-[5px] top-[4px] w-[26px]" data-node-id="62:1297" data-name="Rectangle" />
            <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[292.43px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[128px] whitespace-nowrap" data-node-id="62:1298">
              CN
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:1299" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="62:1300">
            Hiệu quả kết nối
          </p>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:1301" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:1302">
              Tin có yêu cầu nhận
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:1303">
              94%
            </p>
          </div>
          <div className="bg-[var(--sm-canvas,#f5f8f5)] h-[8px] overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[326px]" data-node-id="62:1304" data-name="Frame">
            <div className="absolute bg-[var(--sm-brand,#006642)] h-[8px] left-0 rounded-[4px] top-0 w-[296px]" data-node-id="62:1305" data-name="Rectangle" />
          </div>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:1306" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:1307">
              Ghép cặp thành công
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:1308">
              91%
            </p>
          </div>
          <div className="bg-[var(--sm-canvas,#f5f8f5)] h-[8px] overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[326px]" data-node-id="62:1309" data-name="Frame">
            <div className="absolute bg-[var(--sm-brand,#006642)] h-[8px] left-0 rounded-[4px] top-0 w-[274px]" data-node-id="62:1310" data-name="Rectangle" />
          </div>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:1311" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:1312">
              Bàn giao hoàn tất
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:1313">
              87%
            </p>
          </div>
          <div className="bg-[var(--sm-canvas,#f5f8f5)] h-[8px] overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[326px]" data-node-id="62:1314" data-name="Frame">
            <div className="absolute bg-[var(--sm-brand,#006642)] h-[8px] left-0 rounded-[4px] top-0 w-[246px]" data-node-id="62:1315" data-name="Rectangle" />
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:1316" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="62:1317">
            Điểm cần cải thiện
          </p>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:1318" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:1319">
              Không có người giao
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:1320">
              18 đơn
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:1321" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:1322">
              Hết hạn trước khi nhận
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:1323">
              7 tin
            </p>
          </div>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="62:1324" data-name="go/A04">
            <Icon className="relative shrink-0 size-[24px]" property1="Truck" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="62:1327" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="62:1328">
                Xem chuyến cần hỗ trợ
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="62:1329">
                Ưu tiên xử lý trước khi hết giờ
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="62:1330">
              ›
            </p>
          </a>
        </div>
      </div>
      <div className="absolute bg-[var(--sm-surface,white)] content-stretch cursor-pointer flex h-[72px] items-start left-0 pb-[8px] pt-[9px] top-[802px] w-[402px]" data-node-id="62:1249" data-name="SM/Admin navigation">
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1249;60:570" data-name="go/A01">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:1249;60:571" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1249;60:573">
            Tổng quan
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1249;60:574" data-name="go/A02">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I62:1249;60:575" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I62:1249;60:575;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1249;60:579">
            Hồ sơ
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1249;60:580" data-name="go/A04">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I62:1249;60:581" data-name="Icon">
            <div className="absolute inset-[12.5%_20.83%_13.56%_20.83%]" data-node-id="I62:1249;60:581;6:119" data-name="Group">
              <div className="absolute inset-[-6.15%_-7.79%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1249;60:585">
            Điều phối
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1249;60:586" data-name="go/A05">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:1249;60:587" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1249;60:589">
            Sự cố
          </p>
        </a>
        <a className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1249;60:590" data-name="go/A06">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:1249;60:591" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1249;60:593">
            Thêm
          </p>
        </a>
      </div>
    </div>
  );
}
