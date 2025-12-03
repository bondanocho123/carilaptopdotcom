import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Check } from "lucide-react";
import { formatPrice } from "@/data/laptops";

export const LaptopCard = ({ laptop, onCompare, isSelected, compact }) => {
  return (
    <Card className="p-6 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 h-full flex flex-col">
      <div className="flex items-start gap-3 w-full">
        <span className="w-24 h-24 flex-shrink-0 self-start flex items-center justify-center overflow-hidden">
          <img
            src={`${laptop.brand}-logo.png`}
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </span>

        <div className="flex-grow whitespace-normal break-words">
          <h3 className="font-bold text-lg">{laptop.nama_produk}</h3>
          <p className="text-sm text-muted-foreground">{laptop.brand}</p>
        </div>
      </div>

      {!compact && (
        <>
          <div className="space-y-2 mb-4 flex-1">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Processor:</span>
                <p className="font-medium">{laptop.cpu_brand}</p>
              </div>
              <div>
                <span className="text-muted-foreground">RAM:</span>
                <p className="font-medium">{laptop.ram_size} GB</p>
              </div>
              <div>
                <span className="text-muted-foreground">Storage:</span>
                <p className="font-medium">{laptop.storage_capacity} GB</p>
              </div>
              <div>
                <span className="text-muted-foreground">Storage Type:</span>
                <p className="font-medium">{laptop.storage_type}</p>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-wrap gap-2 mb-4">
            {laptop.strengths.slice(0, 3).map((strength) => (
              <Badge key={strength} variant="secondary" className="text-xs">
                {strength === "harga" && "💰 Harga Terjangkau"}
                {strength === "performa" && "⚡ Performa Tinggi"}
                {strength === "baterai" && "🔋 Baterai Awet"}
                {strength === "ringan" && "🪶 Ringan"}
              </Badge>
            ))}
          </div> */}
        </>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <p className="text-2xl font-bold text-primary">{formatPrice(laptop.harga_normal)}</p>
        </div>
        {onCompare && (
          <Button
            onClick={() => onCompare(laptop)}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            className="gap-2"
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4" />
                Dipilih
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Bandingkan
              </>
            )}
          </Button>
        )}
      </div>
    </Card>
  );
};
