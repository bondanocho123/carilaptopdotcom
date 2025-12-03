import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { formatPrice } from "@/data/laptops";

// === RANKING CPU, LAYAR, OS 2025 (BERDASARKAN laptop.csv) ===
const CPU_RANKING = {
  "Core Ultra 9": 10,
  "Core Ultra 7": 9.8,
  "Core Ultra 5": 9.5,
  "Ryzen 9": 9.5,
  "Core i9": 9.5,
  "Ryzen 7": 9,
  "Core i7": 9,
  "Ryzen 5": 8.5,
  "Core i5": 8.5,
  "Ryzen 3": 7.5,
  "Core i3": 7.5,
  "N100": 6,
  "N150": 6.5,
};

const RESOLUTION_RANKING = {
  "4K": 10,
  "3.8K": 10,
  "3.2K": 9.9,
  "3K": 9.8,
  "2.8K": 9.7,
  "2.5K": 9.5,
  "QHD+": 9.3,
  "QHD": 9.2,
  "FHD+": 8.7,
  "FHD": 8.0,
  "HD+": 7.0,
  "HD": 6.0,
};

const PANEL_RANKING = {
  "OLED": 10,
  "AMOLED": 9.9,
  "Mini LED": 9.8,
  "IPS 165Hz": 9.5,
  "IPS 144Hz": 9.3,
  "IPS 120Hz": 9.0,
  "IPS": 8.5,
  "TN": 6.0,
};

const OS_RANKING = {
  "Windows 11 Pro + Office": 10,
  "Windows 11 Pro": 9.9,
  "Windows 11 Home + Office": 9.8,
  "Windows 11 Home": 9.5,
  "macOS": 9.7,
  "Chrome OS": 8.0,
  "DOS": 7.0,
  "FreeDOS": 6.8,
  "Tanpa OS": 6.5,
};

const Compare = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [compareLaptops, setCompareLaptops] = useState([]);
  const lastFetched = useSelector((state) => state.laptop.lastFetched);

  useEffect(() => {
    const ids = searchParams.get("ids");
    if (!ids || ids.split(",").length < 2) {
      navigate("/");
      return;
    }
    const laptopIds = ids.split(",").map(Number);
    const selected = lastFetched.filter((l) => laptopIds.includes(l.id));
    if (selected.length < 2) {
      navigate("/");
      return;
    }
    setCompareLaptops(selected);
  }, [searchParams, navigate, lastFetched]);

  if (compareLaptops.length === 0) return null;

  const getBestValue = (key) => {
    if (!compareLaptops || compareLaptops.length === 0) return [];
    const values = compareLaptops.map((l) => l[key]);

    // 1. RAM, Storage, Baterai, Layar Ukuran → semakin besar semakin baik
    if (["ram_size", "storage_capacity", "baterai_kapasitas", "layar_ukuran"].includes(key)) {
      const nums = values.map(v => Number(v) || 0);
      const max = Math.max(...nums);
      return nums.map((v, i) => (v === max ? i : -1)).filter(i => i !== -1);
    }

    // 2. Berat → semakin ringan semakin baik
    if (key === "berat") {
      const nums = values.map(v => Number(v) || 999);
      const min = Math.min(...nums);
      return nums.map((v, i) => (v === min ? i : -1)).filter(i => i !== -1);
    }

    // 3. Harga → semakin murah semakin baik
    if (key === "harga_normal" || key === "harga") {
      const nums = values.map(v => Number(v) || Infinity);
      const min = Math.min(...nums);
      return nums.map((v, i) => (v === min ? i : -1)).filter(i => i !== -1);
    }

    // 4. CPU
    if (key === "cpu_seri") {
      const scores = values.map((cpu) => {
        const c = String(cpu || "").trim();
        if (!c) return 0;
        for (const [k, v] of Object.entries(CPU_RANKING)) {
          if (c.includes(k)) return v;
        }
        return 5;
      });
      const max = Math.max(...scores);
      return scores.map((s, i) => (s === max ? i : -1)).filter(i => i !== -1);
    }

    // 5. Layar Resolusi (FIXED: handle undefined/null)
    if (key === "layar_resolusi") {
      const scores = values.map((res) => {
        const r = String(res || "").toUpperCase();
        if (!r || r === "NULL") return 0;
        for (const [k, v] of Object.entries(RESOLUTION_RANKING)) {
          if (r.includes(k)) return v;
        }
        return 7; // default FHD
      });
      const max = Math.max(...scores);
      return scores.map((s, i) => (s === max ? i : -1)).filter(i => i !== -1);
    }

    // 6. Panel Layar (FIXED)
    if (key === "layar_panel") {
      const scores = values.map((panel) => {
        const p = String(panel || "").toUpperCase();
        if (!p) return 0;
        for (const [k, v] of Object.entries(PANEL_RANKING)) {
          if (p.includes(k.toUpperCase())) return v;
        }
        return 7;
      });
      const max = Math.max(...scores);
      return scores.map((s, i) => (s === max ? i : -1)).filter(i => i !== -1);
    }

    // 7. OS (FIXED)
    if (key === "os") {
      const scores = values.map((os) => {
        const o = String(os || "");
        if (!o) return 0;
        for (const [k, v] of Object.entries(OS_RANKING)) {
          if (o.includes(k)) return v;
        }
        return 7;
      });
      const max = Math.max(...scores);
      return scores.map((s, i) => (s === max ? i : -1)).filter(i => i !== -1);
    }

    return [];
  };

  const bestPrices = getBestValue("harga_normal");

  const specLabels = {
    cpu_seri: "Processor",
    ram_size: "RAM",
    storage_capacity: "Storage",
    berat: "Berat",
    baterai_kapasitas: "Baterai",
    layar_ukuran: "Ukuran Layar",
    layar_resolusi: "Resolusi Layar",
    layar_panel: "Jenis Panel",
    os: "Sistem Operasi",
  };

  const formatSpec = (key, value) => {
    if (value === undefined || value === null || value === "") return "-";
    switch (key) {
      case "ram_size":
      case "storage_capacity":
        return `${value} GB`;
      case "berat":
        return `${value} kg`;
      case "baterai_kapasitas":
        return `${value} Wh`;
      case "layar_ukuran":
        return `${value}"`;
      case "layar_resolusi":
        return value.toString().split(" (")[0]; // Hanya ambil "FHD", bukan "(1920 x 1080)"
      default:
        return value;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 gap-2">
            <ChevronLeft className="w-4 h-4" />
            Kembali
          </Button>
          <h1 className="text-3xl font-bold mb-2">Perbandingan Laptop</h1>
          <p className="text-muted-foreground">
            Bandingkan {compareLaptops.length} laptop pilihan Anda
          </p>
        </div>

        <Card className="p-4 mb-6 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">Tips:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <Badge className="bg-primary/20 text-primary mx-1">Terbaik</Badge> = nilai tertinggi</li>
                <li>• <Badge className="bg-green-500/20 text-green-600 mx-1">Termurah</Badge> = harga terbaik</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left font-semibold w-48 sticky left-0 bg-muted/50 z-10">
                    Spesifikasi
                  </th>
                  {compareLaptops.map((laptop) => (
                    <th key={laptop.id} className="p-6 text-center min-w-[280px]">
                      <div className="space-y-3">
                        <img
                          src={`/${laptop.brand}-logo.png`}
                          alt={laptop.brand}
                          className="w-12 h-12 mx-auto object-contain"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                        <div>
                          <h3 className="font-bold text-lg leading-tight">{laptop.nama_produk}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{laptop.brand}</p>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Harga */}
                <tr className="border-b hover:bg-muted/20">
                  <td className="p-4 font-medium sticky left-0 bg-background z-10">Harga</td>
                  {compareLaptops.map((laptop, i) => (
                    <td key={laptop.id} className="p-4 text-center">
                      <div className="space-y-1">
                        <span className="text-xl font-bold text-primary">
                          {formatPrice(laptop.harga_normal)}
                        </span>
                        {bestPrices.includes(i) && (
                          <Badge className="bg-green-500/20 text-green-600 border-green-500">
                            Termurah
                          </Badge>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Semua Spesifikasi */}
                {Object.entries(specLabels).map(([key, label]) => {
                  const bestIndices = getBestValue(key);
                  return (
                    <tr key={key} className="border-b hover:bg-muted/20">
                      <td className="p-4 font-medium sticky left-0 bg-background z-10">{label}</td>
                      {compareLaptops.map((laptop, i) => {
                        const value = laptop[key];
                        const isBest = bestIndices.includes(i);

                        return (
                          <td key={laptop.id} className="p-4 text-center">
                            <div className="space-y-1">
                              <span className={isBest ? "font-bold text-primary" : ""}>
                                {formatSpec(key, value)}
                              </span>
                              {isBest && (
                                <Badge className="bg-primary/20 text-primary">
                                  Terbaik
                                </Badge>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="mt-8 flex gap-4 justify-center">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Pilih Laptop Lain
          </Button>
          <Button onClick={() => navigate("/")} className="bg-gradient-to-r from-primary to-blue-600 text-white">
            Mulai Pencarian Baru
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Compare;