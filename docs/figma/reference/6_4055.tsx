const imgProperty1Mess = "https://www.figma.com/api/mcp/asset/6ddb7334-039b-47db-8c31-262d652a9ce8.svg";
const imgProperty1ChervonLeft = "https://www.figma.com/api/mcp/asset/88ea6a0a-bcaa-420f-ab63-6d8436002fed.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/88b4056c-7381-415c-8558-f1aa40ed2708.svg";

type IconProps = {
  className?: string;
  property1?: "Mess" | "ChervonLeft";
};

function Icon({ className, property1 = "Mess" }: IconProps) {
  const isChervonLeft = property1 === "ChervonLeft";
  return (
    <div className={className || `relative ${isChervonLeft ? "size-[24px]" : "size-[43px]"}`} id={isChervonLeft ? "node-6_140" : "node-6_114"}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={isChervonLeft ? imgProperty1ChervonLeft : imgProperty1Mess} />
    </div>
  );
}

export default function U04HSDangXetDuyt() {
  return (
    <div className="bg-[var(--sm-canvas,#f5f8f5)] relative size-full" data-node-id="6:4055" data-name="U04 · Hồ sơ đang xét duyệt">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[22px] not-italic text-[12px] text-[color:var(--sm-ink,#173a30)] top-[13px] whitespace-nowrap" data-node-id="64:1024">
        9:41
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[1.4] left-[302px] not-italic text-[10px] text-[color:var(--sm-muted,#687c74)] top-[15px] whitespace-pre" data-node-id="64:1025">{`LTE   100%`}</p>
      <div className="absolute content-stretch flex gap-[10px] items-center left-[22px] overflow-clip top-[48px] w-[358px]" data-node-id="64:1026" data-name="Frame">
        <Icon className="block cursor-pointer relative shrink-0 size-[24px]" property1="ChervonLeft" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[308px]" data-node-id="64:1027" data-name="Frame">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[22px] text-[color:var(--sm-ink,#173a30)] w-[308px]" data-node-id="64:1028">
            Hồ sơ đang xét duyệt
          </p>
          <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[308px]" data-node-id="64:1029">
            HS-0419 · Đã gửi hôm nay lúc 08:12
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[14px] h-[722px] items-start left-[22px] overflow-x-clip overflow-y-auto top-[128px] w-[358px]" data-node-id="64:1032" data-name="Content">
        <div className="bg-[var(--sm-dark,#103e31)] content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[24px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:1033" data-name="Frame">
          <div className="overflow-clip relative shrink-0 size-[48px]" data-node-id="64:1034" data-name="Icon">
            <div className="absolute inset-[8.33%]" data-node-id="I64:1034;6:143" data-name="Group">
              <div className="absolute inset-[-2.5%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.4] not-italic relative shrink-0 text-[24px] text-[color:var(--sm-surface,white)] w-[310px]" data-node-id="64:1038">
            Cảm ơn bạn đã hoàn tất hồ sơ
          </p>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-tint,#e3f2e9)] w-[310px]" data-node-id="64:1039">
            Dự kiến phản hồi trong 24 giờ làm việc. Kết quả sẽ được gửi trong Thông báo.
          </p>
        </div>
        <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] shrink-0 w-[358px]" data-node-id="64:1040" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="64:1041">
            Tiến trình xác minh
          </p>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:1042" data-name="Frame">
            <div className="bg-[var(--sm-tint,#e3f2e9)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 size-[26px]" data-node-id="64:1043" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="64:1044">
                ✓
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[286px]" data-node-id="64:1045" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] w-[286px]" data-node-id="64:1046">
                Đã nhận hồ sơ
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="64:1047">
                Thông tin và tài liệu được lưu an toàn
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:1048" data-name="Frame">
            <div className="bg-[var(--sm-brand,#006642)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 size-[26px]" data-node-id="64:1049" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-surface,white)] whitespace-nowrap" data-node-id="64:1050">
                2
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[286px]" data-node-id="64:1051" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[13px] text-[color:var(--sm-ink,#173a30)] w-[286px]" data-node-id="64:1052">
                Đang kiểm tra
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[11px] text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="64:1053">
                Quản trị viên đối chiếu hồ sơ
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="64:1054" data-name="Frame">
            <div className="bg-[var(--sm-canvas,#f5f8f5)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--sm-radius-12,12px)] shrink-0 size-[26px]" data-node-id="64:1055" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[12px] text-[color:var(--sm-brand,#006642)] whitespace-nowrap" data-node-id="64:1056">
                3
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-[color:var(--sm-muted,#687c74)] w-[286px]" data-node-id="64:1057" data-name="Frame">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[13px] w-[286px]" data-node-id="64:1058">
                Thông báo kết quả
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[11px] w-[286px]" data-node-id="64:1059">
                Quyền sử dụng mở theo vai trò
              </p>
            </div>
          </div>
        </div>
        <button className="bg-[#006642] content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="64:1060" data-name="go/checkVerification">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-surface,white)] text-left whitespace-nowrap" data-node-id="I64:1060;6:171">
            Kiểm tra kết quả xác minh
          </p>
        </button>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="64:1062" data-name="go/browseOnly">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I64:1062;6:173">
            Xem thực phẩm ở chế độ xem
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0 w-[358px]" data-node-id="64:1064" data-name="go/U10">
          <Icon className="relative shrink-0 size-[24px]" />
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 text-left w-[292px]" data-node-id="64:1067" data-name="Frame">
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[292px]" data-node-id="64:1068">
              Cần hỗ trợ?
            </p>
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[292px]" data-node-id="64:1069">
              Liên hệ bộ phận xác minh
            </p>
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] text-left whitespace-nowrap" data-node-id="64:1070">
            ›
          </p>
        </a>
        <a className="bg-[var(--sm-surface,white)] border border-[var(--sm-line,#dce7df)] border-solid content-stretch cursor-pointer flex h-[50px] items-center justify-center overflow-clip px-[82px] py-[19px] relative rounded-[12px] shrink-0 w-[358px]" data-node-id="98:1354" data-name="auth/login">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--sm-brand,#006642)] text-left whitespace-nowrap" data-node-id="I98:1354;6:173">
            Đăng xuất / Dùng tài khoản khác
          </p>
        </a>
      </div>
    </div>
  );
}
