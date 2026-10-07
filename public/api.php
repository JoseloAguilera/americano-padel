<?php
// API para hosting con PHP (por ejemplo Hostinger Premium o Business).
// Guarda el americano en datos.json, en esta misma carpeta.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
$file = __DIR__ . '/datos.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  echo file_exists($file) ? file_get_contents($file) : '{"version":0,"data":null}';
  exit;
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $in = json_decode(file_get_contents('php://input'), true);
  if (!is_array($in) || !array_key_exists('data', $in)) { http_response_code(400); echo '{"error":"Datos inválidos"}'; exit; }
  $fp = fopen($file, 'c+');
  flock($fp, LOCK_EX);
  $cur = json_decode(stream_get_contents($fp), true);
  $version = (is_array($cur) && isset($cur['version'])) ? $cur['version'] + 1 : 1;
  ftruncate($fp, 0); rewind($fp);
  fwrite($fp, json_encode(['version' => $version, 'data' => $in['data']], JSON_UNESCAPED_UNICODE));
  fflush($fp); flock($fp, LOCK_UN); fclose($fp);
  echo json_encode(['version' => $version]);
  exit;
}
http_response_code(405);
