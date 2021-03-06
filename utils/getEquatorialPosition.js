// @flow

import { toDegrees, toRadians } from "./index";

/**
 * Compute the Sun's equatorial position from its ecliptic position.
 * Inputs are expected in degrees. Outputs are in degrees as well.
 * https://en.wikipedia.org/wiki/Position_of_the_Sun
 * https://en.wikipedia.org/wiki/Ecliptic_coordinate_system
 *
 *
 * @function getEquatorialPosition
 * @param {number} ECLIPTIC_POSITION
 * @param {number } ECLIPTIC_OBLIQUITY
 *  @returns {Object} EQUATORIAL_POSITION
 */

const getEquatorialPosition = (
  ECLIPTIC_POSITION: number,
  ECLIPTIC_OBLIQUITY: number
) => {
  const { asin, atan, cos, floor, sin, tan } = Math;

  let ALPHA = toDegrees(
    atan(cos(toRadians(ECLIPTIC_OBLIQUITY)) * tan(toRadians(ECLIPTIC_POSITION)))
  );

  const DELTA = toDegrees(
    asin(sin(toRadians(ECLIPTIC_OBLIQUITY)) * sin(toRadians(ECLIPTIC_POSITION)))
  );

  const L_QUADRANT = floor(ECLIPTIC_POSITION / 90) * 90;
  const RA_QUADRANT = floor(ALPHA / 90) * 90;

  ALPHA = ALPHA + (L_QUADRANT - RA_QUADRANT);

  const EQUATORIAL_POSITION = { alpha: ALPHA, delta: DELTA };
  return EQUATORIAL_POSITION;
};

export default getEquatorialPosition;
