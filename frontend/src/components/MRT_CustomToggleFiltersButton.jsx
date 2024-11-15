import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export const MRT_CustomToggleFiltersButton = ({ table, ...rest }) => {
	const {
		getState,
		options: {
			icons: { FilterListIcon, FilterListOffIcon },
			localization,
		},
		setShowColumnFilters,
	} = table;
	const { showColumnFilters } = getState();

	const handleToggleShowFilters = () => {
		setShowColumnFilters(!showColumnFilters);
	};

	return (
		<Tooltip id="MRT_CustomToggleFiltersButton" title={rest?.title ?? localization.showHideFilters}>
			<div
				aria-label={localization.showHideFilters}
				onClick={handleToggleShowFilters}
				{...rest}
				title={undefined}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#ddd"}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ffffff"}
				style={{
					display: "flex",
					border: "1px #808285 solid",
					borderRadius: "4px",
					padding: "6px 16px",
					alignItems: "center",
          cursor: "pointer",
          gap: "8px",
          color: "#808285",
          marginLeft: "8px",
				}}>
				{showColumnFilters ? <FilterListOffIcon /> : <FilterListIcon />}
				<p style={{ margin: "0", color: "#808285" }}>Filters</p>
			</div>
		</Tooltip>
	);
};
