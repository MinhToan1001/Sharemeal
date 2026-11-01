const imgIcon = "https://www.figma.com/api/mcp/asset/3bd00c97-0d0c-436e-a68a-bf06e9c11a2a.svg";

export default function Frame() {
  return (
    <div className="bg-[var(--sm-surface,white)] content-stretch flex flex-col gap-[var(--sm-space-12,12px)] items-start overflow-clip p-[16px] relative rounded-[var(--sm-radius-16,16px)] size-full" data-node-id="110:1214" data-name="Frame">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[16px] text-[color:var(--sm-ink,#173a30)] w-[326px]" data-node-id="110:1215">
        Người phụ trách chuyến
      </p>
      <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[326px]" data-node-id="110:1216" data-name="Frame">
        <div className="relative shrink-0 size-[24px]" data-node-id="110:1217" data-name="Icon">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[260px]" data-node-id="110:1219" data-name="Frame">
          <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[14px] text-[color:var(--sm-ink,#173a30)] w-[260px]" data-node-id="110:1220">
            Trần Quốc Bảo
          </p>
          <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] text-[color:var(--sm-muted,#687c74)] w-[260px]" data-node-id="110:1221">
            Xe máy · Đã xác minh
          </p>
        </div>
        <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[22px] text-[color:var(--sm-muted,#687c74)] whitespace-nowrap" data-node-id="110:1222">
          ›
        </p>
      </div>
    </div>
  );
}
