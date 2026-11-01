const imgProperty1Love = "https://www.figma.com/api/mcp/asset/a7bcb290-9e77-4e95-bdd6-fb3e6d742238.svg";
const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/8a9786f9-b21e-4906-b9db-263ae08b605e.svg";
const imgRectangle = "https://www.figma.com/api/mcp/asset/33a87728-b63a-46b3-a2ca-18ec36c88d4c.png";
const imgEllipse = "https://www.figma.com/api/mcp/asset/643e7cc7-216a-4308-9b1a-f87e61054a9a.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/d0aa278f-5b11-406a-8ef1-dc89659f53c4.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/54d20052-d902-4e1f-8641-5b385ca4ced5.svg";
const imgEllipse1 = "https://www.figma.com/api/mcp/asset/7fa18c42-936c-484b-ab02-7a6510831f93.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/0f9c8c0d-e5bd-460e-a37e-f2ac478c271f.svg";

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

export default function C03TheoDoiDnNhn() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="6:1525" data-name="C03 · Theo dõi đơn nhận">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="110:1157">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="110:1158">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="110:1159" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="ChervonLeft" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[314px]" data-node-id="110:1162" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[23px] text-[color:var(--sm-ink,#173a30)] w-[314px]" data-node-id="110:1163">
            Theo dõi đơn nhận
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[314px]" data-node-id="110:1164">
            DN-367 · Bếp Nhà Lan → Hoa Sen
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="110:1165" data-name="Content">
        <div className="bg-[var(--sm-tint,#e3f2e9)] h-[210px] overflow-clip relative rounded-[var(--sm-radius-24,24px)] shrink-0 w-[358px]" data-node-id="110:1166" data-name="Frame">
          <div className="absolute flex h-[309.051px] items-center justify-center left-[150.01px] top-[-30px] w-[154.786px]" data-node-id="110:1167">
            <div className="flex-none rotate-16">
              <div className="bg-[var(--sm-blueBg,#e9f3f8)] h-[300px] relative w-[75px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[35px] w-[435.408px]" data-node-id="110:1168">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[102.803px] items-center justify-center left-[-20px] top-[-2.07px] w-[430.924px]" data-node-id="110:1169">
            <div className="-rotate-12 flex-none">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[143px] w-[435.408px]" data-node-id="110:1170">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[102.803px] items-center justify-center left-[-20px] top-[105.93px] w-[430.924px]" data-node-id="110:1171">
            <div className="-rotate-12 flex-none">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute flex h-[72.841px] items-center justify-center left-[-21.67px] top-[251px] w-[435.408px]" data-node-id="110:1172">
            <div className="flex-none rotate-8">
              <div className="bg-[var(--sm-surface,white)] h-[12px] relative w-[438px]" data-name="Rectangle" />
            </div>
          </div>
          <div className="absolute bg-[var(--sm-surface,white)] h-[270px] left-[40px] top-[-20px] w-[10px]" data-node-id="110:1173" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[270px] left-[124px] top-[-20px] w-[10px]" data-node-id="110:1174" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[270px] left-[208px] top-[-20px] w-[10px]" data-node-id="110:1175" data-name="Rectangle" />
          <div className="absolute bg-[var(--sm-surface,white)] h-[270px] left-[292px] top-[-20px] w-[10px]" data-node-id="110:1176" data-name="Rectangle" />
          <div className="absolute left-[55px] size-[42px] top-[70px]" data-node-id="110:1177" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
          </div>
          <div className="absolute left-[65px] overflow-clip size-[22px] top-[80px]" data-node-id="110:1178" data-name="Icon">
            <div className="absolute inset-[9.54%_12.5%_8.33%_12.5%]" data-node-id="I110:1178;6:110" data-name="Group">
              <div className="absolute inset-[-5.53%_-6.06%_-4.07%_-6.06%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[1.4] left-[71px] not-italic text-[11px] text-[color:var(--sm-brand,#006642)] top-[49px] whitespace-nowrap" data-node-id="110:1183">
            A
          </p>
          <div className="absolute left-[245px] size-[42px] top-[154px]" data-node-id="110:1184" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
          </div>
          <div className="absolute left-[255px] size-[22px] top-[164px]" data-node-id="110:1185" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[1.4] left-[261px] not-italic text-[11px] text-[color:var(--sm-brand,#006642)] top-[133px] whitespace-nowrap" data-node-id="110:1187">
            B
          </p>
          <div className="absolute left-[160px] size-[42px] top-[120px]" data-node-id="110:1188" data-name="Ellipse">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse1} />
          </div>
          <div className="absolute left-[170px] size-[22px] top-[130px]" data-node-id="110:1189" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[22px] not-italic text-[11px] text-[color:var(--sm-muted,#687c74)] top-[18px] whitespace-nowrap" data-node-id="110:1191">
            Quận 1
          </p>
          <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[1.4] left-[24px] not-italic text-[11px] text-[color:var(--sm-muted,#687c74)] top-[180px] whitespace-nowrap" data-node-id="110:1192">
            Quận 5
          </p>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="110:1193" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="110:1194">
            Tiến trình đơn nhận
          </p>
          <div className="[word-break:break-word] content-stretch flex gap-[12px] items-center leading-[1.4] not-italic overflow-clip relative shrink-0 w-[326px]" data-node-id="110:1195" data-name="Frame">
            <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[32px] text-[color:var(--sm-brand,#006642)] w-[95px]" data-node-id="110:1196">
              35%
            </p>
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[17px] text-[color:var(--sm-ink,#173a30)] w-[219px]" data-node-id="110:1197">
              Đang tìm tình nguyện viên
            </p>
          </div>
          <div className="bg-[var(--sm-tint,#e3f2e9)] h-[10px] overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 w-[326px]" data-node-id="110:1198" data-name="Frame">
            <div className="absolute bg-[var(--sm-brand,#006642)] h-[10px] left-0 rounded-[5px] top-0 w-[var(--state\/trackingwidth,114px)]" data-node-id="110:1199" data-name="Rectangle" />
          </div>
          <div className="[word-break:break-word] content-stretch flex font-['Inter:Medium'] font-medium gap-[6px] items-center leading-[1.4] not-italic overflow-clip relative shrink-0 text-[9px] text-[color:var(--sm-muted,#687c74)] w-[326px]" data-node-id="110:1200" data-name="Frame">
            <p className="relative shrink-0 w-[60px]" data-node-id="110:1201">
              Yêu cầu
            </p>
            <p className="relative shrink-0 w-[60px]" data-node-id="110:1202">
              Ghép cặp
            </p>
            <p className="relative shrink-0 w-[60px]" data-node-id="110:1203">
              Nhận việc
            </p>
            <p className="relative shrink-0 w-[60px]" data-node-id="110:1204">
              Đang giao
            </p>
            <p className="relative shrink-0 w-[60px]" data-node-id="110:1205">
              Bàn giao
            </p>
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[326px]" data-node-id="110:1206">
            Đang điều phối tình nguyện viên
          </p>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="110:1207" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="110:1208">
            Bữa ăn đang được trao
          </p>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="110:1209" data-name="Frame">
            <div className="h-[88px] relative rounded-[14px] shrink-0 w-[94px]" data-node-id="110:1210" data-name="Rectangle">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[14px] size-full" src={imgRectangle} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[6px] items-start not-italic overflow-clip relative shrink-0 w-[220px]" data-node-id="110:1211" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.4] relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[220px]" data-node-id="110:1212">
                15 suất cơm gà
              </p>
              <div className="font-['Inter:Regular'] font-normal leading-[0] relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[220px]" data-node-id="110:1213">
                <p className="leading-[1.4] mb-0">Bếp Nhà Lan</p>
                <p className="leading-[1.4]">Mái ấm Hoa Sen</p>
              </div>
            </div>
          </div>
        </div>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="110:1229" data-name="action/Xem tình trạng tìm người giao">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I110:1229;6:173">
            Xem tình trạng tìm người giao
          </p>
        </a>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="110:1231" data-name="action/Nhắn tin về đơn nhận">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I110:1231;6:173">
            Nhắn tin về đơn nhận
          </p>
        </a>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="110:1233" data-name="action/Báo vấn đề / Yêu cầu hỗ trợ">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I110:1233;6:173">
            Báo vấn đề / Yêu cầu hỗ trợ
          </p>
        </a>
      </div>
    </div>
  );
}
