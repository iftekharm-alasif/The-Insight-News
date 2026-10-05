const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <h2 className="text-lg font-bold tracking-wide">
            The Insight
          </h2>

          <p className="text-sm text-gray-400 text-center">
            সত্য ও নির্ভরযোগ্য সংবাদ
          </p>

          <p className="text-sm text-gray-500">
            © 2026 The Insight
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;