import { Card, CardContent } from "@/components/ui/card";

export function MissionMapPlaceholder() {
  return (
    <Card className="border-dashed">
      <CardContent className="space-y-2">
        <h2 className="text-lg font-semibold text-text-primary">
          Map component placeholder
        </h2>
        <p className="text-sm text-text-muted">
          Future React Leaflet wrappers should live in `components/maps` so map
          concerns stay reusable across dashboard features.
        </p>
      </CardContent>
    </Card>
  );
}
