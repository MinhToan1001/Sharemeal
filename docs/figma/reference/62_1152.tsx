const imgProperty1Home = "https://www.figma.com/api/mcp/asset/c3f42147-3adc-4a54-b24e-96149835ac9a.svg";
const imgProperty1Notice = "https://www.figma.com/api/mcp/asset/937a7b24-eba7-4ad1-9750-d6c385cf5bb1.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/d9d90c7d-4b13-4b95-84c8-3f915c8f7b80.svg";
const imgNhMinhHaKitchen = "https://www.figma.com/api/mcp/asset/1f5d1444-90df-44f6-af84-91ae84e86cc1.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/9519e4bd-208a-43a3-a9c3-eadfed4f5c9b.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/3fcfca9e-0057-4c75-9489-2d48125d5e4b.svg";
const imgGroup2 = "https://www.figma.com/api/mcp/asset/56471f8a-f09f-426e-8e67-7b1fe231366c.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/1d14c3d3-23cf-4b55-a191-a6f14ded30f7.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/dda133c7-ad8e-4e74-a599-43b77a2002e5.svg";

type IconProps = {
  className?: string;
  property1?: "Home" | "Notice" | "Security";
};

function Icon({ className, property1 = "Home" }: IconProps) {
  const isNotice = property1 === "Notice";
  const isSecurity = property1 === "Security";
  return (
    <div className={className || `relative ${isSecurity ? "overflow-clip size-[34px]" : isNotice ? "size-[41px]" : "size-[43px]"}`} id={isSecurity ? "node-6_134" : isNotice ? "node-6_101" : "node-6_90"}>
      {["Home", "Notice"].includes(property1) && <img alt="" className="absolute block inset-0 max-w-none size-full" src={isNotice ? imgProperty1Notice : imgProperty1Home} />}
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

export default function A06TaiKhonQuyn() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="62:1152" data-name="A06 · Tài khoản & quyền">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="62:1153">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="62:1154">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="62:1155" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="62:1156" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="62:1157">{`Tài khoản & quyền`}</p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="62:1158">
            Quản lý theo từng vai trò đã xác minh
          </p>
        </div>
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="Notice" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[662px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="62:1161" data-name="Content">
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:1187" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="62:1188">
            Bếp Nhà Lan
          </p>
          <div className="h-[116px] relative rounded-[16px] shrink-0 w-[326px]" data-node-id="73:1038" data-name="Ảnh minh họa / kitchen">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgNhMinhHaKitchen} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[326px]" data-node-id="62:1189">
            Nguyễn Thu Lan · 0903 118 266
          </p>
          <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[104px]" data-node-id="62:1190" data-name="Frame">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[11px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="62:1191">
              Đang hoạt động
            </p>
          </div>
          <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="62:1192" data-name="go/A03">
            <Icon className="overflow-clip relative shrink-0 size-[24px]" property1="Security" />
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[260px]" data-node-id="62:1197" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="62:1198">
                Người cho / Nhà hàng
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="62:1199">
                Hồ sơ đã được xác minh
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="62:1200">
              ›
            </p>
          </a>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:1201" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="62:1202">
            Quyền đang có hiệu lực
          </p>
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:1203" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:1204">
              Đăng thực phẩm
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:1205">
              Được phép
            </p>
          </div>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="62:1206" data-name="Rectangle" />
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:1207" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:1208">
              Duyệt yêu cầu nhận
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:1209">
              Được phép
            </p>
          </div>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="62:1210" data-name="Rectangle" />
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:1211" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:1212">
              Xác nhận bàn giao
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:1213">
              Được phép
            </p>
          </div>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="62:1214" data-name="Rectangle" />
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:1215" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:1216">
              Nhận thực phẩm
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:1217">
              Chưa có role
            </p>
          </div>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="62:1218" data-name="Rectangle" />
          <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[1.4] not-italic overflow-clip relative shrink-0 text-[12px] w-[326px]" data-node-id="62:1219" data-name="Frame">
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[140px]" data-node-id="62:1220">
              Nhận chuyến giao
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[color:var(--sm-ink,#173a30)] text-right w-[176px]" data-node-id="62:1221">
              Chưa có role
            </p>
          </div>
          <div className="bg-[var(--sm-line,#dce7df)] h-px relative shrink-0 w-[326px]" data-node-id="62:1222" data-name="Rectangle" />
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="62:1223" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="62:1224">
            Lịch sử quản trị
          </p>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="62:1225" data-name="Frame">
            <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 size-[26px]" data-node-id="62:1226" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="62:1227">
                ✓
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[286px]" data-node-id="62:1228" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] w-[286px]" data-node-id="62:1229">
                Hôm nay · 10:24
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="62:1230">
                Thu Hà xác minh hồ sơ HS-0419
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="62:1231" data-name="Frame">
            <div className="bg-[var(--sm-brand,#006642)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 size-[26px]" data-node-id="62:1232" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-surface,white)] whitespace-nowrap" data-node-id="62:1233">
                2
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[286px]" data-node-id="62:1234" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] w-[286px]" data-node-id="62:1235">
                Hôm nay · 08:12
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="62:1236">
                Đối tác gửi hồ sơ lần đầu
              </p>
            </div>
          </div>
        </div>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="62:1237" data-name="go/A08">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I62:1237;6:173">
            Xem sự cố liên quan
          </p>
        </a>
      </div>
      <div className="absolute bg-[var(--sm-surface,white)] content-stretch flex h-[72px] items-start left-0 pb-[8px] pt-[9px] top-[802px] w-[402px]" data-node-id="62:1162" data-name="SM/Admin navigation">
        <a className="content-stretch cursor-pointer flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1162;60:570" data-name="go/A01">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:1162;60:571" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1162;60:573">
            Tổng quan
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1162;60:574" data-name="go/A02">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I62:1162;60:575" data-name="Icon">
            <div className="absolute inset-[8.33%_12.5%_6.25%_12.5%]" data-node-id="I62:1162;60:575;6:135" data-name="Group">
              <div className="absolute inset-[-5.32%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1162;60:579">
            Hồ sơ
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1162;60:580" data-name="go/A04">
          <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="I62:1162;60:581" data-name="Icon">
            <div className="absolute inset-[12.5%_20.83%_13.56%_20.83%]" data-node-id="I62:1162;60:581;6:119" data-name="Group">
              <div className="absolute inset-[-6.15%_-7.79%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup2} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1162;60:585">
            Điều phối
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1162;60:586" data-name="go/A05">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:1162;60:587" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="I62:1162;60:589">
            Sự cố
          </p>
        </a>
        <div className="content-stretch flex flex-col gap-[4px] h-[54px] items-center overflow-clip relative shrink-0 w-[80.4px]" data-node-id="I62:1162;60:590" data-name="go/A06">
          <div className="relative shrink-0 size-[22px]" data-node-id="I62:1162;60:591" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--sm-muted,#687c74)] whitespace-nowrap" data-node-id="I62:1162;60:593">
            Thêm
          </p>
        </div>
      </div>
    </div>
  );
}
