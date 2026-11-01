const imgProperty1Home = "https://www.figma.com/api/mcp/asset/4dda7174-1dc5-4e90-b051-abafb387a3c1.svg";
const imgProperty1Notice = "https://www.figma.com/api/mcp/asset/90049449-4c34-495d-a733-ea35c1ae9a91.svg";
const imgNhMinhHaHandoff = "https://www.figma.com/api/mcp/asset/44d20019-a47d-45d1-a27b-41a3c0a76414.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/31676157-bbe5-4c66-a9b1-3d503272e4e6.svg";
const imgEllipse = "https://www.figma.com/api/mcp/asset/e92f0ba9-fe8c-4a43-ae5b-52fb87288143.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/99a4f0cb-0b54-4bb3-afa1-84470ade7265.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/111316a2-0818-44fb-a02d-63eecdc1fc5f.svg";
const imgEllipse1 = "https://www.figma.com/api/mcp/asset/92549278-d8fe-4c36-a82f-e7638952b20f.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/54cc6e24-acd1-47c4-a98f-f7abee4f28a8.svg";
const imgIconTrangCh = "https://www.figma.com/api/mcp/asset/f66376a9-b426-49ab-86f4-a30caaa56513.svg";
const imgIconVicGiao = "https://www.figma.com/api/mcp/asset/a24c7b95-5be4-4563-881f-78e6665139fe.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/6ec1cbaa-d098-45bf-a45b-9fe4ccf7848f.svg";
const imgIconHuyHiu = "https://www.figma.com/api/mcp/asset/4a9acd1c-8bad-40a5-a9af-21dfdc8cac03.svg";
const imgGroup2 = "https://www.figma.com/api/mcp/asset/6a0432a7-dd0d-4496-a4e8-aa5dd970c70b.svg";

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

export default function V01SnSangTraoBaAn() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="6:1737" data-name="V01 · Sẵn sàng trao bữa ăn">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[calc(10%-18.2px)] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="66:1532">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[calc(70%+20.6px)] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="66:1533">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[calc(10%-18.2px)] overflow-clip top-[48px] w-[358px]" data-node-id="66:1534" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="66:1535" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="66:1536">
            Sẵn sàng trao bữa ăn
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="66:1537">
            Quốc Bảo · Tình nguyện viên
          </p>
        </div>
        <Icon className="block cursor-pointer relative shrink-0 size-[41px]" property1="Notice" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[662px] items-start left-[calc(10%-18.2px)] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="66:1540" data-name="Content">
        <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex gap-[12px] items-center overflow-clip p-[14px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="66:1541" data-name="Frame">
          <div className="relative shrink-0 size-[24px]" data-node-id="66:1542" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[282px]" data-node-id="66:1544" data-name="Frame">
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[282px]" data-node-id="66:1545">
              Đang sẵn sàng nhận việc
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[282px]" data-node-id="66:1546">
              Xe máy · bán kính 5 km · đến 22:00
            </p>
          </div>
        </div>
        <div className="bg-[var(--sm-tint,#e3f2e9)] h-[244px] overflow-clip relative rounded-[var(--sm-radius-24,24px)] shrink-0 w-[358px]" data-node-id="66:1547" data-name="Frame">
          <div className="absolute flex h-[341.734px] items-center justify-center left-[140.64px] top-[-30px] w-[164.158px]" data-node-id="66:1548">
            <div className="flex-none rotate-16">
              <div className="bg-[var(--sm-blueBg,#e9f3f8)] h-[334px] relative w-[75px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[35px] w-[435.408px]" data-node-id="66:1549">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[102.803px] items-center justify-center left-[-20px] top-[-2.07px] w-[430.924px]" data-node-id="66:1550">
            <div className="-rotate-12 flex-none">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[143px] w-[435.408px]" data-node-id="66:1551">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[102.803px] items-center justify-center left-[-20px] top-[105.93px] w-[430.924px]" data-node-id="66:1552">
            <div className="-rotate-12 flex-none">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[251px] w-[435.408px]" data-node-id="66:1553">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute bg-[var(--sm-surface,white)] h-[304px] left-[40px] top-[-20px] w-[10px]" data-node-id="66:1554" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[304px] left-[124px] top-[-20px] w-[10px]" data-node-id="66:1555" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[304px] left-[208px] top-[-20px] w-[10px]" data-node-id="66:1556" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[304px] left-[292px] top-[-20px] w-[10px]" data-node-id="66:1557" data-name="Rectangle" />
          <div className="absolute left-[55px] size-[42px] top-[70px]" data-node-id="66:1558" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
          </div>
          <div className="absolute left-[65px] overflow-clip size-[22px] top-[80px]" data-node-id="66:1559" data-name="Icon">
            <div className="absolute inset-[9.54%_12.5%_8.33%_12.5%]" data-node-id="I66:1559;6:110" data-name="Group">
              <div className="absolute inset-[-5.53%_-6.06%_-4.07%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[1.4] left-[71px] not-italic text-[11px] text-[color:var(--sm-brand,#006642)] top-[49px] whitespace-nowrap" data-node-id="66:1564">
            A
          </p>
          <div className="absolute left-[245px] size-[42px] top-[170px]" data-node-id="66:1565" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
          </div>
          <div className="absolute left-[255px] size-[22px] top-[180px]" data-node-id="66:1566" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[1.4] left-[261px] not-italic text-[11px] text-[color:var(--sm-brand,#006642)] top-[149px] whitespace-nowrap" data-node-id="66:1568">
            B
          </p>
          <div className="absolute left-[160px] size-[42px] top-[120px]" data-node-id="66:1569" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse1} />
          </div>
          <div className="absolute left-[170px] size-[22px] top-[130px]" data-node-id="66:1570" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[22px] not-italic text-[11px] text-[color:var(--sm-muted,#687c74)] top-[18px] whitespace-nowrap" data-node-id="66:1572">
            Quận 1
          </p>
          <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[273px] not-italic text-[11px] text-[color:var(--sm-muted,#687c74)] top-[212px] whitespace-nowrap" data-node-id="66:1573">
            Quận 5
          </p>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="66:1574" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="66:1575">
            Chuyến gần bạn nhất
          </p>
          <div className="h-[118px] relative rounded-[16px] shrink-0 w-[326px]" data-node-id="73:1032" data-name="Ảnh minh họa / handoff">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaHandoff} />
          </div>
          <div className="bg-[var(--sm-amberBg,#fff0d7)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[194px]" data-node-id="66:1576" data-name="Frame">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-amber,#a35a09)] whitespace-nowrap" data-node-id="66:1577">
              Cần lấy trước 20:30
            </p>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="66:1578">
            Bếp Nhà Lan → Mái ấm Hoa Sen
          </p>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="66:1579" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="66:1580">
              Khối lượng
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="66:1581">
              15 hộp · 3,9 km
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="66:1582" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="66:1583">
              Thời gian dự kiến
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="66:1584">
              25 phút · +30 điểm
            </p>
          </div>
          <a className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[326px]" data-node-id="66:1585" data-name="go/jobDetail">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I66:1585;6:171">{`Xem tuyến & nhận chuyến`}</p>
          </a>
        </div>
        <div className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[358px]" data-node-id="66:1587" data-name="Frame">
          <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[173px]" data-node-id="66:1588" data-name="go/jobs">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I66:1588;6:173">
              Việc giao gần đây
            </p>
          </a>
          <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[173px]" data-node-id="66:1590" data-name="go/U24">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I66:1590;6:173">
              Đăng ký ca
            </p>
          </a>
        </div>
      </div>
      <div className="absolute bg-white h-[67px] left-0 overflow-clip top-[807px] w-[402px]" data-node-id="66:1592" data-name="Bottom navigation / V01">
        <div className="absolute h-[67px] left-[11px] overflow-clip top-0 w-[69px]" data-node-id="66:1593" data-name="Tab / Trang chủ">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[34.5px] not-italic text-[#006642] text-[12px] text-center top-[49.5px] whitespace-nowrap" data-node-id="66:1594">
            <p className="leading-[normal]">Trang chủ</p>
          </div>
          <div className="absolute left-[22.5px] size-[24px] top-[8px]" data-node-id="66:1595" data-name="Icon / Trang chủ">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconTrangCh} />
          </div>
        </div>
        <div className="absolute h-[67px] left-[91px] overflow-clip top-0 w-[69px]" data-node-id="66:1596" data-name="Tab / Việc giao">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[34px] not-italic text-[#54635c] text-[12px] text-center top-[49.5px] whitespace-nowrap" data-node-id="66:1597">
            <p className="leading-[normal]">Việc giao</p>
          </div>
          <div className="absolute left-[22.5px] size-[24px] top-[8px]" data-node-id="66:1598" data-name="Icon / Việc giao">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconVicGiao} />
          </div>
        </div>
        <div className="absolute h-[67px] left-[171px] overflow-clip top-0 w-[69px]" data-node-id="66:1599" data-name="Tab / Lịch">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[34.5px] not-italic text-[#54635c] text-[12px] text-center top-[49.5px] whitespace-nowrap" data-node-id="66:1600">
            <p className="leading-[normal]">Lịch</p>
          </div>
          <div className="absolute left-[22.5px] overflow-clip size-[24px] top-[8px]" data-node-id="66:1601" data-name="Icon / Lịch">
            <div className="absolute inset-[8.33%]" data-node-id="I66:1601;6:125" data-name="Group">
              <div className="absolute inset-[-5%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[67px] left-[251px] overflow-clip top-0 w-[69px]" data-node-id="66:1602" data-name="Tab / Huy hiệu">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[34px] not-italic text-[#54635c] text-[12px] text-center top-[49.5px] whitespace-nowrap" data-node-id="66:1603">
            <p className="leading-[normal]">Huy hiệu</p>
          </div>
          <div className="absolute left-[22.5px] size-[24px] top-[8px]" data-node-id="66:1604" data-name="Icon / Huy hiệu">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconHuyHiu} />
          </div>
        </div>
        <div className="absolute h-[67px] left-[331px] overflow-clip top-0 w-[69px]" data-node-id="66:1605" data-name="Tab / Tôi">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] left-[34px] not-italic text-[#54635c] text-[12px] text-center top-[49.5px] whitespace-nowrap" data-node-id="66:1606">
            <p className="leading-[normal]">Tôi</p>
          </div>
          <div className="absolute left-[22.5px] overflow-clip size-[24px] top-[8px]" data-node-id="66:1607" data-name="Icon / Tôi">
            <div className="absolute inset-[16.67%]" data-node-id="I66:1607;6:95" data-name="Group">
              <div className="absolute inset-[-7.81%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup2} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bg-[#dbe0de] h-px left-0 top-0 w-[402px]" data-node-id="66:1608" data-name="BottomBar Divider" />
      </div>
      <button className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-0 top-[807px] w-[80.4px]" data-node-id="84:1759" data-name="Prototype / Trang chủ" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[20%] top-[807px] w-[80.4px]" data-node-id="84:1761" data-name="Prototype / Việc giao" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[40%] top-[807px] w-[80.4px]" data-node-id="84:1763" data-name="Prototype / Lịch" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[60%] top-[807px] w-[80.4px]" data-node-id="84:1765" data-name="Prototype / Huy hiệu" />
      <a className="absolute bg-[rgba(0,0,0,0)] block cursor-pointer h-[67px] left-[80%] top-[807px] w-[80.4px]" data-node-id="84:1767" data-name="Prototype / Tôi" />
    </div>
  );
}
