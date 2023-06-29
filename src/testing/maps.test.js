import { formData } from '../maps/maps';

it('test_min_input_values', () => {
  const data = [[0, 0]];
  const limits = {
    minX: 0, maxX: 1, minY: 0, maxY: 1,
  };
  const dimensions = { width: 1, height: 1 };
  const result = formData(data, limits, dimensions);
  expect(result).toEqual([{ x: 0, y: 1 }]);
});

it('test_max_input_values', () => {
  const data = [[100, 100]];
  const limits = {
    minX: 0, maxX: 100, minY: 0, maxY: 100,
  };
  const dimensions = { width: 100, height: 100 };
  const result = formData(data, limits, dimensions);
  expect(result).toEqual([{ x: 100, y: 0 }]);
});

it('test_random_input_values', () => {
  const data = [[10, 20], [30, 40], [50, 60]];
  const limits = {
    minX: 0, maxX: 100, minY: 0, maxY: 100,
  };
  const dimensions = { width: 100, height: 100 };
  const result = formData(data, limits, dimensions);
  expect(result).toEqual([
    { x: 10, y: 80 },
    { x: 30, y: 60 },
    { x: 50, y: 40 },
  ]);
});
