export function calcularCompatibilidad(usuario, perfil) {
  let score = 0;

  if (usuario.personalidad === perfil.personalidad) score += 40;

  const hobbiesEnComun = usuario.hobbies.filter(h =>
    perfil.hobbies.includes(h)
  );

  score += hobbiesEnComun.length * 20;

  if (perfil.distancia < 5) score += 20;

  return Math.min(score, 100);
}
