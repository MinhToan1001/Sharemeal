const imgProperty1Notice = "https://www.figma.com/api/mcp/asset/1bcd9217-b358-464c-afc9-471ef5bda549.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/a864eb70-3b21-4041-b47e-c27cd6c6cd6f.svg";
const imgNhMinhHaKitchen = "https://www.figma.com/api/mcp/asset/728eb7ae-3f69-4344-ad0c-d49472c91383.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/e781d452-9d7e-4e85-87d5-eec07e4ed790.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/4620f439-bdc6-48eb-a9f7-fe3b7e0daddb.svg";

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

export default function A16HSQucBo() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="77:1384" data-name="A16 · Hồ sơ Quốc Bảo">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[calc(10%-18.2px)] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="77:1385">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[calc(70%+20.6px)] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="77:1386">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[calc(10%-18.2px)] overflow-clip top-[48px] w-[358px]" data-node-id="77:1387" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="77:1388" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="77:1389">
            Hồ sơ Quốc Bảo
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="77:1390">
            HS-0421 · Tình nguyện viên
          </p>
        </div>
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[606px] items-start left-[calc(10%-18.2px)] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="77:1392" data-name="Content">
        <div className="[word-break:break-word] bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start leading-[1.4] not-italic overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="77:1393" data-name="Frame">
          <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="77:1394">
            Thông tin đối tác
          </p>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="77:1395" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="77:1396">
              Họ và tên
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="77:1397">
              Trần Quốc Bảo
            </p>
          </div>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="77:1398" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="77:1399">
              Khu vực hoạt động
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="77:1400">
              Quận 1, 3, 5
            </p>
          </div>
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="77:1401" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="77:1402">
              Số giấy tờ
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="77:1403">
              0790 •••• 4821
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-8,8px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="77:1404" data-name="Frame">
          <div className="h-[124px] relative rounded-[16px] shrink-0 w-[326px]" data-node-id="77:1405" data-name="Ảnh minh họa / kitchen">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaKitchen} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] w-[326px]" data-node-id="77:1406">
            Ảnh giao nhận · hình minh họa
          </p>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="77:1407" data-name="Frame">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="Security" />
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-ink,#173a30)] w-[166px]" data-node-id="77:1409">{`DANH TÍNH & PHƯƠNG TIỆN`}</p>
          </div>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="77:1410" data-name="Rectangle" />
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[15px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="77:1411">
            TÌNH NGUYỆN VIÊN QUỐC BẢO
          </p>
          <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[326px]" data-node-id="77:1412">
            <p className="leading-[1.4] mb-0">CCCD: 0790 •••• 4821</p>
            <p className="leading-[1.4] mb-0">Chân dung và phương tiện đã đối chiếu.</p>
            <p className="leading-[1.4]">Biển số 59-A1 123.45 · Cam kết giao nhận</p>
          </div>
          <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[158px]" data-node-id="77:1413" data-name="Frame">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="77:1414">
              3 tài liệu đã đối chiếu
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="77:1415" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="77:1416">
            Điều kiện phê duyệt
          </p>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="77:1417" data-name="Frame">
            <div className="relative shrink-0 size-[18px]" data-node-id="77:1418" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-ink,#173a30)] whitespace-nowrap" data-node-id="77:1419">
              Danh tính và địa chỉ trùng khớp
            </p>
          </div>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="77:1420" data-name="Frame">
            <div className="relative shrink-0 size-[18px]" data-node-id="77:1421" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-ink,#173a30)] w-[164px]" data-node-id="77:1422">
              Giấy tờ tùy thân còn hiệu lực
            </p>
          </div>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="77:1423" data-name="Frame">
            <div className="relative shrink-0 size-[18px]" data-node-id="77:1424" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-ink,#173a30)] w-[151px]" data-node-id="77:1425">
              Cam kết vận chuyển đã ký
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-blueBg,#e9f3f8)] content-stretch flex gap-[10px] items-center overflow-clip p-[14px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="77:1426" data-name="Frame">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="77:1427" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I77:1427;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-blue,#2c6580)] w-[298px]" data-node-id="77:1428">
            Duyệt mở quyền nhận chuyến và xác nhận giao nhận thực phẩm.
          </p>
        </div>
      </div>
      <div className="absolute content-stretch cursor-pointer flex flex-col gap-[var(--sm-space-8,8px)] items-start left-[calc(10%-18.2px)] overflow-clip top-[746px] w-[358px]" data-node-id="77:1429" data-name="Sticky approval actions">
        <a className="bg-[#006642] content-stretch flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="77:1430" data-name="go/approve">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I77:1430;6:171">
            Phê duyệt hồ sơ
          </p>
        </a>
        <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-[358px]" data-node-id="77:1431" data-name="Frame">
          <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[174px]" data-node-id="77:1432" data-name="go/supplement">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I77:1432;6:173">
              Yêu cầu bổ sung
            </p>
          </a>
          <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[174px]" data-node-id="77:1433" data-name="go/reject">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I77:1433;6:173">
              Từ chối
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
