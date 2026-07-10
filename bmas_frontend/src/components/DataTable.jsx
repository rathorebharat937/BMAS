import React, { useState, useMemo } from 'react';
import EmptyState from './EmptyState';

export const DataTable = ({
  columns,
  data = [],
  searchPlaceholder = 'Search records...',
  searchField = 'title',
  filterOptions = [], // array of { key, label, options: [{ value, label }] }
  actions, // node to render next to search
  onRowClick,
  initialSortKey = '',
  initialSortOrder = 'desc',
  rowsPerPageOptions = [5, 10, 25, 50],
  defaultRowsPerPage = 10
}) => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState(initialSortKey);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  
  // Dynamic filter states
  const [filters, setFilters] = useState(() => {
    const initial = {};
    filterOptions.forEach(f => {
      initial[f.key] = 'ALL';
    });
    return initial;
  });

  const handleFilterChange = (key, val) => {
    setFilters(prev => ({ ...prev, [key]: val }));
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  // Filter & Search & Sort logic
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply Filter dropdowns
    Object.keys(filters).forEach(key => {
      const value = filters[key];
      if (value !== 'ALL') {
        result = result.filter(item => {
          const itemVal = item[key] ? String(item[key]).toUpperCase() : '';
          return itemVal === String(value).toUpperCase();
        });
      }
    });

    // Apply Search
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(item => {
        // search multiple string fields if field is specified or just do a general search
        const val = item[searchField] ? String(item[searchField]).toLowerCase() : '';
        const idVal = item.id ? String(item.id).toLowerCase() : '';
        const projectVal = item.projectName ? String(item.projectName).toLowerCase() : '';
        return val.includes(query) || idVal.includes(query) || projectVal.includes(query);
      });
    }

    // Apply Sort
    if (sortKey) {
      result.sort((a, b) => {
        let valA = a[sortKey];
        let valB = b[sortKey];
        
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();
        
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, search, searchField, filters, sortKey, sortOrder]);

  // Paginate
  const totalRows = processedData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * rowsPerPage;
    return processedData.slice(startIdx, startIdx + rowsPerPage);
  }, [processedData, currentPage, rowsPerPage]);

  const startRange = totalRows === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endRange = Math.min(currentPage * rowsPerPage, totalRows);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
      {/* Table Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-3 border-b border-slate-100 bg-slate-50">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Search Box */}
          <div className="relative w-full max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 text-sm">
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Filters */}
          {filterOptions.map(f => (
            <div key={f.key} className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2 py-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{f.label}:</span>
              <select
                value={filters[f.key]}
                onChange={(e) => handleFilterChange(f.key, e.target.value)}
                className="text-xs bg-transparent outline-none font-semibold text-slate-700 cursor-pointer pr-1"
              >
                <option value="ALL">All</option>
                {f.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Actual Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 font-bold uppercase select-none">
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-6 py-3.5 tracking-wider font-semibold ${
                    col.sortable ? 'cursor-pointer hover:bg-slate-100 hover:text-slate-800 transition-colors' : ''
                  } ${col.className || ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.label}</span>
                    {col.sortable && sortKey === col.key && (
                      <span className="text-[10px] text-slate-400">
                        {sortOrder === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-150">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr
                  key={row.id || index}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`group transition-colors ${
                    onRowClick ? 'cursor-pointer hover:bg-slate-50' : 'hover:bg-slate-50/50'
                  }`}
                >
                  {columns.map(col => (
                    <td key={col.key} className={`px-6 py-3.5 font-medium text-slate-700 ${col.className || ''}`}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-0">
                  <EmptyState 
                    title="No records found" 
                    description="No tickets match the active search criteria or filters."
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination */}
      {totalRows > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-slate-100 bg-slate-50 gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Show</span>
            <select
              value={rowsPerPage}
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="bg-white border border-slate-200 rounded px-1.5 py-0.5 outline-none font-bold text-slate-700 focus:border-primary"
            >
              {rowsPerPageOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <span>entries</span>
            <span className="mx-2 text-slate-350">|</span>
            <span>
              Showing <strong className="text-slate-800">{startRange}</strong> to <strong className="text-slate-800">{endRange}</strong> of <strong className="text-slate-800">{totalRows}</strong> records
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 border border-slate-200 rounded-lg bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-all cursor-pointer"
            >
              ◀
            </button>
            
            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              // Only display pagination bounds to keep UI tidy
              if (totalPages > 5 && Math.abs(p - currentPage) > 1 && p !== 1 && p !== totalPages) {
                if (p === 2 || p === totalPages - 1) {
                  return <span key={p} className="px-1 text-slate-400">...</span>;
                }
                return null;
              }
              return (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === p
                      ? 'bg-primary text-white shadow-sm'
                      : 'border border-slate-200 bg-white text-slate-650 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-slate-200 rounded-lg bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-all cursor-pointer"
            >
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
