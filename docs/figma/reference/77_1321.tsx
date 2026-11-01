const imgProperty1Notice = "https://www.figma.com/api/mcp/asset/4507e3b2-2142-4baa-852e-a3be27cd5b17.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/b22838b9-469d-414b-aed8-1f0a4a5aa587.svg";
const imgNhMinhHaKitchen = "https://www.figma.com/api/mcp/asset/50228210-a100-4fd9-98bd-043b0c41f52e.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/a23f75ee-c37f-4b02-848c-5a198a7668df.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/5009e120-8ad3-4559-aecf-3f8141d2f756.svg";

type IconProps = {
  className?: string;
  property1?: "Notice" | "Security";
};

function Icon({ className, property1 = "Notice" }: IconProps) {
  const isSecurity = property1 === "Security";
  return (
    <div className={className || `relative ${isSecurity ? "overflow-clip size-[34px]" : "size-[41px]"}`} id={isSecurity ? "node-6_134" : "node-6_101"}>
      {property1 === "Notice" && <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgProperty1Notice} />}
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

export default function A15HSMaimHoaSen() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="77:1321" data-name="A15 · Hồ sơ Mái ấm Hoa Sen">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[calc(10%-18.2px)] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="77:1322">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[calc(70%+20.6px)] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="77:1323">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[calc(10%-18.2px)] overflow-clip top-[48px] w-[358px]" data-node-id="77:1324" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="77:1325" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="77:1326">
            Hồ sơ Mái ấm Hoa Sen
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="77:1327">
            HS-0420 · Tổ chức từ thiện
          </p>
        </div>
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[606px] items-start left-[calc(10%-18.2px)] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="77:1329" data-name="Content">
        <div className="[word-break:break-word] bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start leading-[1.4] not-italic overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="77:1330" data-name="Frame">
          <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="77:1331">
            Thông tin đối tác
          </p>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="77:1332" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="77:1333">
              Người đại diện
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="77:1334">
              Lê Thu Hà
            </p>
          </div>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="77:1335" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="77:1336">
              Địa chỉ
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="77:1337">
              12 Lê Hồng Phong, Q.5
            </p>
          </div>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="77:1338" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="77:1339">
              Số xác nhận
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="77:1340">
              TC-00518
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-8,8px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="77:1341" data-name="Frame">
          <div className="h-[124px] relative rounded-[16px] shrink-0 w-[326px]" data-node-id="77:1342" data-name="Ảnh minh họa / kitchen">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaKitchen} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] w-[326px]" data-node-id="77:1343">
            Ảnh cơ sở · hình minh họa
          </p>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="77:1344" data-name="Frame">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="Security" />
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-ink,#173a30)] w-[200px]" data-node-id="77:1346">
              XÁC NHẬN HOẠT ĐỘNG TỔ CHỨC
            </p>
          </div>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="77:1347" data-name="Rectangle" />
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[15px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="77:1348">
            TỔ CHỨC TỪ THIỆN HOA SEN
          </p>
          <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[326px]" data-node-id="77:1349">
            <p className="leading-[1.4] mb-0">Số xác nhận: TC-00518</p>
            <p className="leading-[1.4] mb-0">Địa điểm nhận và người phụ trách đã đối chiếu.</p>
            <p className="leading-[1.4]">Giấy tờ tổ chức · Ảnh cơ sở nhận</p>
          </div>
          <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[158px]" data-node-id="77:1350" data-name="Frame">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="77:1351">
              3 tài liệu đã đối chiếu
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="77:1352" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="77:1353">
            Điều kiện phê duyệt
          </p>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="77:1354" data-name="Frame">
            <div className="relative shrink-0 size-[18px]" data-node-id="77:1355" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-ink,#173a30)] whitespace-nowrap" data-node-id="77:1356">
              Danh tính và địa chỉ trùng khớp
            </p>
          </div>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="77:1357" data-name="Frame">
            <div className="relative shrink-0 size-[18px]" data-node-id="77:1358" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-ink,#173a30)] w-[161px]" data-node-id="77:1359">
              Giấy tờ tổ chức còn hiệu lực
            </p>
          </div>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="77:1360" data-name="Frame">
            <div className="relative shrink-0 size-[18px]" data-node-id="77:1361" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-ink,#173a30)] w-[155px]" data-node-id="77:1362">
              Địa điểm nhận đã đối chiếu
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-blueBg,#e9f3f8)] content-stretch flex gap-[10px] items-center overflow-clip p-[14px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="77:1363" data-name="Frame">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="77:1364" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I77:1364;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-blue,#2c6580)] w-[298px]" data-node-id="77:1365">
            Duyệt mở quyền đăng nhu cầu và gửi yêu cầu nhận thực phẩm.
          </p>
        </div>
      </div>
      <div className="absolute content-stretch cursor-pointer flex flex-col gap-[var(--sm-space-8,8px)] items-start left-[calc(10%-18.2px)] overflow-clip top-[746px] w-[358px]" data-node-id="77:1366" data-name="Sticky approval actions">
        <a className="bg-[#006642] content-stretch flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="77:1367" data-name="go/approve">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I77:1367;6:171">
            Phê duyệt hồ sơ
          </p>
        </a>
        <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[358px]" data-node-id="77:1368" data-name="Frame">
          <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[174px]" data-node-id="77:1369" data-name="go/supplement">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I77:1369;6:173">
              Yêu cầu bổ sung
            </p>
          </a>
          <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[174px]" data-node-id="77:1370" data-name="go/reject">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I77:1370;6:173">
              Từ chối
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
