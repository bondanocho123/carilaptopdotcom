import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LaptopCard } from "@/components/LaptopCard";
import {LaptopSkeletonCard} from "@/components/LaptopCardSkeleton";
import { getRecommendedLaptops } from "@/data/laptops";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { LaptopApi } from "../api/laptop.api";
import { useDispatch } from "react-redux";
import { setLastFetched } from "../store/laptopSlice";
import { set } from "react-hook-form";

const Results = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedLaptops, setSelectedLaptops] = useState([]);

  const usage = searchParams.get("usage");
  const priority = searchParams.get("priority");
  const budget = searchParams.get("budget");

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (!usage || !priority || !budget) {
      navigate("/");
    }

    setLoading(true);
    LaptopApi.get_rekomendasi(budget, priority, usage)
      .then((res) => {
        setRecommendations(res.data)
        dispatch(setLastFetched(res.data));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => { setLoading(false)  });
  }, [usage, priority, budget, navigate]);

  const handleToggleCompare = (laptop) => {
    setSelectedLaptops((prev) => {
      const isSelected = prev.find((l) => l.id === laptop.id);
      if (isSelected) {
        return prev.filter((l) => l.id !== laptop.id);
      } else {
        if (prev.length >= 3) return prev; // Max 3
        return [...prev, laptop];
      }
    });
  };

  const handleCompare = () => {
    if (selectedLaptops.length >= 2) {
      const ids = selectedLaptops.map((l) => l.id).join(",");
      console.log(ids)
      navigate(`/compare?ids=${ids}`);
    }
  };

  const usageLabels = {
    kuliah: "Kuliah",
    kerja: "Kerja kantoran",
    desain: "Desain grafis",
    gaming: "Gaming",
    editing: "Editing video",
  };

  const priorityLabels = {
    harga: "Harga murah",
    performa: "Performa",
    baterai: "Baterai",
    ringan: "Ringan",
  };

  const budgetLabels = {
    low: "< 5 juta",
    mid: "5–10 juta",
    high: "> 10 juta",
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Wizard
          </Button>

          <h1 className="text-3xl font-bold mb-2">Rekomendasi Laptop untuk Anda</h1>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span>
              Kebutuhan: <strong>{usageLabels[usage || ""]}</strong>
            </span>
            <span>•</span>
            <span>
              Prioritas: <strong>{priorityLabels[priority || ""]}</strong>
            </span>
            <span>•</span>
            <span>
              Budget: <strong>{budgetLabels[budget || ""]}</strong>
            </span>
          </div>
        </div>

        {/* Selected for comparison */}
        {selectedLaptops.length > 0 && (
          <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20 animate-scale-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {selectedLaptops.length} laptop dipilih untuk dibandingkan
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedLaptops.length < 2
                    ? "Pilih minimal 2 laptop untuk membandingkan"
                    : `Siap membandingkan ${selectedLaptops.map((l) => l.nama_produk).join(", ")}`}
                </p>
              </div>
              <Button
                onClick={handleCompare}
                disabled={selectedLaptops.length < 2}
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0"
              >
                Bandingkan Sekarang
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {loading ? (
          // LOADING VIEW
          <div className="flex flex-col md:grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <LaptopSkeletonCard key={i} />
            ))}
          </div>
        ) : recommendations.length > 0 ? (
          // HAS DATA
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {recommendations.map((laptop) => (
              <LaptopCard
                key={laptop.id}
                laptop={laptop}
                onCompare={handleToggleCompare}
                isSelected={!!selectedLaptops.find((l) => l.id === laptop.id)}
              />
            ))}
          </div>
        ) : (
          // EMPTY STATE
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              Tidak ada laptop yang cocok dengan kriteria Anda.
            </p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Coba Kriteria Lain
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
