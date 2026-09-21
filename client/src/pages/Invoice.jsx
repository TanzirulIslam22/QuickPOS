// Invoice.jsx - Printable invoice modal shown after a successful checkout
export default function Invoice({ sale, onClose }) {
  if (!sale) return null;

  const invoiceNo = sale._id?.slice(-8).toUpperCase() ?? "--------";
  const date = new Date(sale.date).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  function handlePrint() {
    window.print();
  }

  return (
    <>
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center"
        onClick={onClose}
      >
        {/* modal card */}
        <div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 z-50 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          id="invoice-modal"
        >
          {/* green header band */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-500 px-6 py-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold tracking-wide">QuickPOS</h1>
                <p className="text-emerald-100 text-xs mt-0.5">Point of Sale System</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-emerald-100 uppercase tracking-widest">Invoice</p>
                <p className="font-bold text-lg">#{invoiceNo}</p>
              </div>
            </div>
          </div>

          {/* body */}
          <div className="px-6 py-4 space-y-4">
            {/* date */}
            <div className="flex justify-between text-sm text-gray-500">
              <span>Date &amp; Time</span>
              <span className="font-medium text-gray-700">{date}</span>
            </div>

            <hr className="border-dashed border-gray-300" />

            {/* items table */}
            <div>
              <div className="grid grid-cols-12 text-xs font-semibold text-gray-400 uppercase mb-1 px-1">
                <span className="col-span-5">Item</span>
                <span className="col-span-2 text-center">Qty</span>
                <span className="col-span-2 text-right">Price</span>
                <span className="col-span-3 text-right">Amount</span>
              </div>

              <div className="space-y-1">
                {sale.items.map((it, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 text-sm text-gray-700 bg-gray-50 hover:bg-emerald-50 transition-colors px-1 py-1.5 rounded-lg"
                  >
                    <span className="col-span-5 font-medium truncate">{it.name}</span>
                    <span className="col-span-2 text-center text-gray-500">{it.qty}</span>
                    <span className="col-span-2 text-right text-gray-500">{it.price}</span>
                    <span className="col-span-3 text-right font-semibold">
                      {(it.price * it.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-dashed border-gray-300" />

            {/* totals */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{sale.total.toFixed(2)} Tk</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount Paid</span>
                <span className="font-medium text-blue-600">{sale.paidAmount.toFixed(2)} Tk</span>
              </div>
              <div className="flex justify-between text-base font-bold">
                <span className="text-gray-700">Change Returned</span>
                <span className="text-emerald-600">{sale.change.toFixed(2)} Tk</span>
              </div>
            </div>

            {/* grand total banner */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl px-4 py-3 flex justify-between items-center">
              <span className="text-gray-600 font-semibold">Grand Total</span>
              <span className="text-2xl font-extrabold text-emerald-700">
                {sale.total.toFixed(2)} Tk
              </span>
            </div>

            {/* thank-you note */}
            <p className="text-center text-xs text-gray-400 italic">
              Thank you for your purchase! 🎉
            </p>

            {/* action buttons */}
            <div className="flex gap-3 pt-1 no-print">
              <button
                onClick={handlePrint}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2"
              >
                🖨️ Print Invoice
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all text-gray-700 font-semibold py-2.5 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* print-only styles */}
      <style>{`
        @media print {
          body > * { display: none !important; }
          #invoice-modal {
            display: block !important;
            position: fixed !important;
            top: 0; left: 0;
            width: 100%; height: auto;
            box-shadow: none !important;
            border-radius: 0 !important;
            max-width: 100% !important;
          }
          .no-print { display: none !important; }
          .fixed { background: none !important; }
        }
      `}</style>
    </>
  );
}
