import { Calculator, User, Calendar, Scale, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from "react";
import * as growth from "@/lib/growth";
import weightAgeB from "@/tools/weight-age-b.json";
import weightAgeG from "@/tools/weight-age-g.json";
import weightLengthB from "@/tools/weight-length-b.json";
import weightLengthG from "@/tools/weight-length-g.json";
import lengthAgeB from "@/tools/length-age-b.json";
import lengthAgeG from "@/tools/length-age-g.json";



type RefResult = { z: number; label: string; ref: string } | null;

type AnalysisResult = {
  child: { ageMonths?: number | null; gender: string; weight: number; height: number };
  references: string[];
  results: Array<{ z: number; percentile: number; category: string; label: string; ref: string } | null>;
  error?: string;
};

const GrowthAssessment: React.FC = () => {
  const [gender, setGender] = useState<string | undefined>(undefined);
  const [dob, setDob] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCompute = async () => {
    setLoading(true);
    try {
      // derive age in months from dob if provided
      let months: number | null = null;
      if (dob) {
        const b = new Date(dob);
        const now = new Date();
        const yrs = now.getFullYear() - b.getFullYear();
        const mos = now.getMonth() - b.getMonth();
        months = yrs * 12 + mos;
        if (now.getDate() < b.getDate()) months -= 1;
      }

      const w = Number(weight);
      const h = Number(height);

      // select file names based on gender (female -> 'g', male -> 'b')
      const gSuffix = (gender === 'male' || gender === 'm') ? 'b' : 'g';

      // Use imported JSON data directly instead of fetching
      const weightAgeRef = gSuffix === 'b' ? weightAgeB : weightAgeG;
      const lengthWeightRef = gSuffix === 'b' ? weightLengthB : weightLengthG;
      const lengthAgeRef = gSuffix === 'b' ? lengthAgeB : lengthAgeG;

      // helper find closest
      const findClosest = (records: Array<Record<string, unknown>>, keys: string[], value: number) => {
        let best = null;
        let bestDiff = Infinity;
        for (const r of records) {
          for (const k of keys) {
            if (r[k] == null) continue;
            const diff = Math.abs(Number(r[k] as number) - value);
            if (diff < bestDiff) {
              bestDiff = diff;
              best = { record: r, key: k };
            }
          }
        }
        return best;
      };

      // compute z-scores using nearest records
      const weightAgeRes = months != null ? (() => {
        const found = findClosest(weightAgeRef, ["Month", "month"], months);
        if (!found) return null;
        const { record } = found;
        const z = growth.zscore(w, Number(record.L), Number(record.M), Number(record.S));
        return { z, label: 'Weight-for-Age', ref: `Weight-for-Age (${gSuffix === 'b' ? 'Boys' : 'Girls'}, WHO)` } as RefResult;
      })() : null;

      const heightAgeRes = (() => {
        const found = findClosest(lengthAgeRef, ["Month", "month"], months ?? 24);
        if (!found) return null;
        const { record } = found;
        const z = growth.zscore(h, Number(record.L), Number(record.M), Number(record.S));
        return { z, label: 'Height-for-Age', ref: `Height-for-Age (${gSuffix === 'b' ? 'Boys' : 'Girls'}, WHO)` } as RefResult;
      })();

      const weightHeightRes = (() => {
        const found = findClosest(lengthWeightRef, ["Length_cm","Height_cm","Length","Height"], h);
        if (!found) return null;
        const { record } = found;
        const z = growth.zscore(w, Number(record.L), Number(record.M), Number(record.S));
        return { z, label: 'Weight-for-Height', ref: `Weight-for-Height (${gSuffix === 'b' ? 'Boys' : 'Girls'}, WHO)` } as RefResult;
      })();

      // categories and readable results
      const build = (r: RefResult, kind: 'wfa' | 'hfa' | 'wfh') => {
        if (!r) return null;
        const z = Number(r.z as number);
        const pct = growth.zToPercentile(z) * 100;
        let cat = 'unknown';
        if (kind === 'wfa') cat = growth.categorizeWeightForAgeZ(z);
        if (kind === 'hfa') cat = growth.categorizeHeightForAgeZ(z);
        if (kind === 'wfh') cat = growth.categorizeWeightForHeightZ(z);
        return { z: Number(z.toFixed(2)), percentile: Number(pct.toFixed(1)), category: cat, label: r.label, ref: r.ref };
      };

      const out: AnalysisResult = {
        child: {
          ageMonths: months ?? undefined,
          gender: gender ?? (gSuffix === 'b' ? 'male' : 'female'),
          weight: w,
          height: h,
        },
        references: [weightAgeRes?.ref, heightAgeRes?.ref, weightHeightRes?.ref].filter(Boolean) as string[],
        results: [ build(weightAgeRes, 'wfa'), build(heightAgeRes, 'hfa'), build(weightHeightRes, 'wfh') ],
      };

      setResult(out);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setResult({ error: msg } as AnalysisResult);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    // In a real app, this would save the data to a database or state management system
    alert("Assessment saved successfully!");
  };

  const formatAge = (months?: number | null) => {
    if (months == null) return '—';
    const yrs = Math.floor(months / 12);
    const mos = months % 12;
    return `${yrs} years ${mos} months`;
  };

  const finalStatusSentence = (results: AnalysisResult['results']) => {
    if (!results) return '';
    const parts: string[] = [];
    const wfa = results[0];
    const hfa = results[1];
    const wfh = results[2];
    if (wfa) {
      if (wfa.category.includes('Underweight') || wfa.category.includes('Severely underweight')) parts.push('has underweight for age');
      else if (wfa.category.includes('Overweight')) parts.push('has overweight for age');
      else parts.push('has healthy weight for age');
    }
    if (hfa) {
      if (hfa.category.includes('Stunted') || hfa.category.includes('Severely stunted')) parts.push('is stunted in height');
      else parts.push('has normal height for age');
    }
    if (wfh) {
      if (wfh.category.includes('Wasting') || wfh.category.includes('Severe wasting')) parts.push('is wasted for height');
      else if (wfh.category.includes('Overweight')) parts.push('is overweight for height');
      else parts.push('has normal weight for height');
    }
    return parts.join(', ') + '.';
  };

  return (
    <section className="py-12 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-lg p-8 border border-border">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">Patient Data Entry</h3>
              <p className="text-sm text-muted-foreground">WHO Growth Standards Assessment Protocol</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="gender" className="flex items-center gap-2 text-foreground font-medium">
                <User className="w-4 h-4 text-primary" />
                GENDER CLASSIFICATION
              </Label>
              <Select onValueChange={(v) => setGender(v)}>
                <SelectTrigger id="gender" className="bg-background">
                  <SelectValue placeholder="Select gender classification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob" className="flex items-center gap-2 text-foreground font-medium">
                <Calendar className="w-4 h-4 text-primary" />
                DATE OF BIRTH
              </Label>
              <Input 
                id="dob" 
                type="date" 
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className="flex items-center gap-2 text-foreground font-medium">
                <Scale className="w-4 h-4 text-primary" />
                WEIGHT (KG)
              </Label>
              <Input 
                id="weight" 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in kilograms"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height" className="flex items-center gap-2 text-foreground font-medium">
                <Ruler className="w-4 h-4 text-primary" />
                HEIGHT (CM)
              </Label>
              <Input 
                id="height" 
                type="number" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height in centimeters"
                className="bg-background"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" onClick={handleCompute} disabled={loading} className="bg-warning hover:bg-warning/90 text-warning-foreground">
              {loading ? 'Computing…' : 'Analyze Growth'}
            </Button>
            {result && (
              <Button size="lg" onClick={handleSave} variant="outline">
                Save Assessment
              </Button>
            )}
          </div>

          {result && (
            <div className="mt-8 p-4 bg-muted/60 rounded-md">
              {result.error ? (
                <div className="text-destructive">Error: {result.error}</div>
              ) : (
                <div>
                  <h4 className="font-semibold text-lg">Child Information:</h4>
                  <div>Age months: {result.child.ageMonths ?? '—'}</div>
                  <div>Gender: {result.child.gender}</div>
                  <div>Weight: {result.child.weight} kg</div>
                  <div>Height: {result.child.height} cm</div>

                  <h5 className="mt-4 font-medium">Reference Charts Used:</h5>
                  <ul className="list-disc pl-6">
                    {result.references.map((r: string, i: number) => <li key={i}>{r}</li>)}
                  </ul>

                  <h5 className="mt-4 font-medium">Z-Score Results:</h5>
                  <ol className="pl-6 list-decimal">
                    {result.results.map((res, i) => (
                      <li key={i} className="mb-2">
                        <strong>{res?.label ?? '—'}:</strong> {res?.z ?? '—'} SD → {res?.category ?? '—'}
                      </li>
                    ))}
                  </ol>

                  <h5 className="mt-4 font-medium">📌 Final Status:</h5>
                  <div>{finalStatusSentence(result.results)}</div>

                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default GrowthAssessment;